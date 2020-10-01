import React, { useContext } from 'react'
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';

import userContext from '../../../context/user';
import ErrorView from '../../../components/ErrorView';
import LoadingView from '../../../components/LoadingView';

import { Dialog } from '../models';
import Layout from './Layout';


const __query = graphql`
  query ChatQuery($dialogID: ID!) {
    messenger{
      messages(dialogID: $dialogID, limit: 50, offset: 0){
        edges{
          __typename
          ... on Message{
            id
            senderKind
            senderID
            sentAt
            text
            replyToMessage{
              id
              text
              senderKind
              senderID
            }
            attachments{
              __typename
              ... on Photo{
                id
                previewURL
                mediumURL
              }
            }
          }
          ... on MessageInit{
            id
            sentAt
          }
          ... on MessageJoin{
            id
            sentAt
            participant{
              objectKind
              objectID
              role
              object{
                __typename
                ... on User{
                  id
                  displayName:display_name
                  avatar{
                    id
                    previewURL
                  }
                }
                ... on Community{
                  id
                  displayName:title
                  avatar{
                    id
                    previewURL
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export default ({route: { params }}) => {
  const { environment } = useContext(ReactRelayContext);
  const { user } = useContext(userContext);

  const dialog = params.dialog as Dialog;
  const dialogID = dialog.id;

  const senderKind = "user";
  const senderID = `${user?.realID}`;

  return <QueryRenderer
    environment={environment}
    query={__query}
    variables={{dialogID}}
    render={({props, error, retry}) => {
      if (error) {
        return <ErrorView error={error} retry={retry} />
      }
      if (!props) {
        return <LoadingView />
      }

      return <Layout
        messages={props.messenger.messages.edges}
        dialog={dialog}
        senderKind={senderKind} senderID={senderID}
      />
    }}
  />
}
