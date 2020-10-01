import React from 'react';
import styled from 'styled-components/native';
import { Dialog, Message } from '../models';
import MessagesList from './MessagesList';

export interface ComponentProps {
  messages: Message[]
  dialog: Dialog
  senderKind: string
  senderID: string
}

export default (props: ComponentProps) => {
  return <Container>
    <MessagesList messages={props.messages} dialog={props.dialog} senderKind={props.senderKind} senderID={props.senderID} />
    <DialogInteractionSection>

    </DialogInteractionSection>
  </Container>
}

const Container = styled.View`
  display: flex;
  flex: 1;
  
`;

const DialogInteractionSection = styled.View`
  height: 50px;
  background: yellow;
`;
