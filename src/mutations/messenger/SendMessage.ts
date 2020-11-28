import { commitMutation, graphql, commitLocalUpdate } from 'react-relay';

const mutation = graphql`
  mutation SendMessageMutation(
    $dialogID: ID!,
    $text: String!,
    $communityID: Int,
    $replyToID: ID,
    $attachments: [MessageAttachmentDefinition]!
  ) {
    messengerMutations {
      send(
        dialogID: $dialogID,
        text: $text,
        communityID: $communityID,
        replyToID: $replyToID,
        attachments: $attachments
      ) {
        id
        senderKind
        senderID
        sentAt
        text
        replyToMessage {
          id
          senderKind
          senderID
          sentAt
          text
        }
        attachments {
          __typename
          ... on Photo {
            id
            realID
            previewURL
          }
        }
      }
    }
  }
`;

function commit(
  environment,
  { dialogID, text, communityID=null, replyToID=null, attachments=[] },
  onCompleted,
) {
  const variables = { dialogID, text, communityID, replyToID, attachments };

  return commitMutation(environment, {
    mutation,
    variables,
    updater: (store) => {
      const messengerRecord = store.getRoot().getLinkedRecord("messenger");
      if (!messengerRecord) {
        return;
      }

      // add message to list
      const connection = messengerRecord.getLinkedRecord("messages", { dialogID });
      if (!connection) {
        return;
      }

      const newMessage = store.getRootField("messengerMutations").getLinkedRecord("send", variables);
      const edges = connection.getLinkedRecords("edges");
      connection.setLinkedRecords([newMessage, ...edges], "edges");

      // update dialog
      const dialog = store.get(dialogID)
      dialog.setLinkedRecord(newMessage, "lastMessage");
      const unreadInDialog = dialog.getValue("unreadCount")
      dialog.setValue(0, "unreadCount");

      // update global counter
      if (unreadInDialog > 0) {
        const dialogs = messengerRecord.getLinkedRecord("dialogs", communityID ? { communityID } : undefined);
        if (!dialogs) {
          console.log('no dialogs');
          return;
        }
        let newGlobalUnread = dialogs.getValue("unreadCount") - unreadInDialog;
        if (newGlobalUnread < 0) {
          newGlobalUnread = 0;
        }
        dialogs.setValue(newGlobalUnread, "unreadCount");
      }
    },
    onCompleted: (rsp, error) => {
      if (error) {
        return onCompleted(null, error)
      }
      onCompleted(null, null);
    },
  });
}

export default commit;

export const sendMessageAsync = (environment, variables) => {
  return new Promise((resolve, reject) => {
    commit(environment, variables, (rsp, err) => {
      if(err) {
        reject(err);
      }
      resolve(rsp);
    });
  });
}
