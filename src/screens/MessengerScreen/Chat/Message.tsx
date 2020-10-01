import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import { DialogParticipant, DialogType, Message } from '../models';


export interface ComponentProps {
  message: Message
  getParticipant: (kind, id) => DialogParticipant
  dialogType: DialogType
  isMyMessage: boolean
}

export default (props: ComponentProps) => {
  const message = props.message;
  if (message.__typename !== "Message") {
    return null;
  }
  
  let avatar: ReactNode | null = null
  if (props.dialogType === DialogType.GROUP && !props.isMyMessage) {
    const sender = props.getParticipant(message.senderKind, message.senderID);
    if (sender.object.avatar){
      avatar = <Avatar source={{uri: sender.object.avatar.previewURL}} />
    } else {
      avatar = <AvatarEmpty />
    }
  }

  return <Container isMyMessage={props.isMyMessage}>
    {avatar}
    <Bubble isMyMessage={props.isMyMessage}>
      <MessageText>{message.text}</MessageText>
    </Bubble>
  </Container>
}

const Container = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-bottom: 10px;
  ${({isMyMessage}) => isMyMessage && `
    flex-direction: row-reverse;
  `}
`;

const Avatar = styled.Image`
  width: 34px;
  height: 34px;
  border-radius: 34px;

`;

const AvatarEmpty = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
`;

const Bubble = styled.View`
  ${({isMyMessage}) => isMyMessage
    ? `background-color: rgba(255,255,255,0.1);`
    : `background-color: rgba(255,255,255,0.06);`
  }
  border-radius: 10px;
  padding: 10px;
  margin-left: 5px;
  margin-right: 5px;
  max-width: 70%;
`;

const MessageText = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;