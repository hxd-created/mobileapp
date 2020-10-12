import React from 'react';
import { Platform } from 'react-native';
import styled from 'styled-components/native';

import { Dialog, Message } from '../models';
import MessageBox from './MessageBox';
import MessagesList from './MessagesList';


export interface ComponentProps {
  messages: Message[]
  dialog: Dialog
  senderKind: string
  senderID: string
}

export default (props: ComponentProps) => {
  return <Container behavior={Platform.OS == "ios" ? "padding" : "height"} keyboardVerticalOffset={64}>
    <MessagesList
      messages={props.messages}
      dialog={props.dialog}
      senderKind={props.senderKind}
      senderID={props.senderID}
    />
    <MessageBox />
  </Container>
}

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: flex-end;
`;
