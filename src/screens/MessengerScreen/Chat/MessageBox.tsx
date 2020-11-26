import React, { useState } from 'react';
import { Modal, Alert } from 'react-native';
import styled from 'styled-components';

import AddCircleIcon from '../../../components/Icons/AddCircleIcon';
import WritebarSendIcon from '../../../components/Icons/WritebarSend';
import AttachmentsModal from './AttachmentsModal';


export default () => {
  const [ isAttachmentsModalShown, setAttachmentsModalShown ] = useState(false);
  return (<>
    <DialogInteractionSection>
      <AttachmentButton onPress={() => setAttachmentsModalShown(!isAttachmentsModalShown)}>
        <AddCircleIcon color="rgba(255,255,255, 0.5)" />
      </AttachmentButton>
      <MessageBox
        multiline={true}
      />
      <SendBtnContainer>
        <WritebarSendIcon width={42} height={42} />
      </SendBtnContainer>
    </DialogInteractionSection>
    <AttachmentsModal
      isShown={isAttachmentsModalShown}
      addAttachments={() => { console.log('addAttachments') }}
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

const MessageBox = styled.TextInput`
  flex: 1;
  max-height: 120px;
  font-size: 15px;

  margin-top: 8px;
  margin-bottom: 6px;
  margin-left: 6px;
  margin-right: 6px;

  border-radius: 20px;
  padding-left: 10px;
  padding-top: 6px;
  padding-bottom: 6px;
  border-color: ${({theme}) => theme.colors.border};
  border-width: 1px;
  color: ${({theme}) => theme.colors.text};
`;

const SendBtnContainer = styled.TouchableOpacity`
  width: 42px;
  align-self: flex-end;
  padding-bottom: 2px;
`;
