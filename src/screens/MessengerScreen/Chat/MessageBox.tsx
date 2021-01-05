import React, { useState } from 'react';
import styled from 'styled-components';

import AddCircleIcon from '../../../components/Icons/AddCircleIcon';
import WritebarSendIcon from '../../../components/Icons/WritebarSend';

import { Dialog, MessageQueueItem, MessageQueueItemAttachment } from '../models';
import AttachmentsModal from '../../../components/AttachmentsModal';

var tempIDCounter = 0;
function generateTempID() {
  tempIDCounter = tempIDCounter + 1;
  return `temp-id-${tempIDCounter}`;
}

export interface ComponentProps {
  sendMessage: (msg: MessageQueueItem) => void
  dialog: Dialog
}

export default (props: ComponentProps) => {
  const [ isAttachmentsModalShown, setAttachmentsModalShown ] = useState(false);
  const [ attachedAssets, setAttachedAssets ] = useState([]);
  const [ messageText, setMessageText ] = useState("");

  const removeAttachedItem = (index) => {
    setAttachedAssets(attachedAssets.filter((_, curIndex) => curIndex !== index));
  }

  const handleSend = () => {
    console.log("messageText", messageText)
    if(messageText.length === 0 && attachedAssets.length === 0) {
      return;
    }

    props.sendMessage({
      __typename: "MessageQueueItem",
      id: generateTempID(),
      dialogID: props.dialog.id,
      text: messageText,
      attachments: attachedAssets as MessageQueueItemAttachment[],
    });
    setAttachedAssets([]);
    setMessageText("");
  }

  return (<>
    <DialogInteractionSection>
      <AttachmentButton onPress={() => setAttachmentsModalShown(!isAttachmentsModalShown)}>
        <AddCircleIcon color="rgba(255,255,255, 0.5)" />
      </AttachmentButton>
      <MessageBox>
        {attachedAssets.length > 0 && <AttachmentsList horizontal={true}>
          {attachedAssets
            .filter(asset => asset.mediaType === "photo")
            .map((asset, index) => (<AttachmentItem key={`photo-${index}-${asset.id}`} onPress={() => removeAttachedItem(index)}>
              <AttachmentImage source={{uri: asset.uri}} />
            </AttachmentItem>))
          }
        </AttachmentsList>}
        <MessageInput
          multiline={true}
          placeholder={"Message"}
          value={messageText}
          onChangeText={val => setMessageText(val)}
        />
      </MessageBox>
      <SendBtnContainer onPress={handleSend}>
        <WritebarSendIcon width={42} height={42} />
      </SendBtnContainer>
    </DialogInteractionSection>
    <AttachmentsModal
      isShown={isAttachmentsModalShown}
      addAttachments={(newAttachedAssets) => { setAttachedAssets([...attachedAssets, ...newAttachedAssets]) }}
      onClose={() => setAttachmentsModalShown(false)}
    />
  </>);
}

const DialogInteractionSection = styled.SafeAreaView`
  flex-direction: row;
`;

const AttachmentButton = styled.TouchableOpacity`
  width: 42px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding-left: 10px;
  padding-bottom: 8px;
`;

const MessageBox = styled.View`
  flex: 1;
  flex-direction: column;
  
  margin-top: 8px;
  margin-bottom: 6px;
  margin-left: 6px;
  margin-right: 6px;

  border-radius: 20px;
  border-color: ${({theme}) => theme.colors.border};
  border-width: 1px;
  overflow: hidden;
`;

const AttachmentsList = styled.ScrollView`
  /* height: 70px; */
  flex-direction: row;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.border};
  padding-top: 6px;
  padding-bottom: 6px;
  padding-right: 6px;
`;

const AttachmentItem = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  margin-left: 6px;
  border-radius: 10px;
  overflow: hidden;
`;

const AttachmentImage = styled.Image`
  flex: 1;
`;

const MessageInput = styled.TextInput`
  max-height: 120px;
  font-size: 15px;

  padding-left: 10px;
  padding-top: 2px;
  padding-bottom: 2px;
  color: ${({theme}) => theme.colors.text};
`;

const SendBtnContainer = styled.TouchableOpacity`
  width: 42px;
  align-self: flex-end;
  padding-bottom: 2px;
`;
