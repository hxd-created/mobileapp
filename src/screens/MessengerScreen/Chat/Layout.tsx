import React, { useState } from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { Dialog, Message, MessageGeneric, MessageQueueItem } from '../models';
import MessageBox from './MessageBox';
import MessagesList from './MessagesList';


export interface ComponentProps {
  messages: Message[]
  dialog: Dialog
  senderKind: string
  senderID: string
}

export default (props: ComponentProps) => {
  const [ sendQueue, setSendQueue ] = useState<MessageQueueItem[]>([]);

  const sendMessage = (msg: MessageQueueItem) => {
    // TODO: тут нужно изюавиться от очереди
    //       и добавить это в стор
    setSendQueue([msg, ...sendQueue]);
  }

  const removeMessageFromQueue = (tempID: string) => {
    setSendQueue(sendQueue.filter( msg => msg.id !== tempID));
  }

  return <Container behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={64}>
    <MessagesList
      messages={props.messages}
      dialog={props.dialog}
      senderKind={props.senderKind}
      senderID={props.senderID}

      sendQueue={sendQueue as MessageGeneric[]}
      removeMessageFromQueue={removeMessageFromQueue}
    />
    <MessageBox sendMessage={sendMessage} dialog={props.dialog} />
  </Container>
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
`;
