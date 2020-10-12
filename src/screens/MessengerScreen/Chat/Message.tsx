import React, { ReactNode } from 'react';
import styled from 'styled-components/native';
import PhotosGrid from '../../../components/PhotosGrid';
import { DialogParticipant, DialogType, Message, Photo } from '../models';


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

  const photos: Photo[] = message.attachments
    .filter(attachment => attachment.__typename === "Photo")


  return <>
    <Container isMyMessage={props.isMyMessage}>
      {avatar}
      <MessageContentContainer isMyMessage={props.isMyMessage}>
        {message.text.trim() !== "" && <Bubble isMyMessage={props.isMyMessage} size={getBubbleSizeByText(message.text)}>
          <MessageText>{message.text}</MessageText>
        </Bubble>}
        {photos.length > 0 && <PhotosGridContainer>
          <PhotosGrid photos={photos} containerWidth={300} />
        </PhotosGridContainer>}
      </MessageContentContainer>
    </Container>
  </>
}

function getBubbleSizeByText(text: string): "s" | "m" | "l" | "xl" {
  const len = text.length;
  if (len > 200) {
    return "xl";
  }
  if (len > 150) {
    return "l";
  }
  if (len > 100) {
    return "m";
  }

  return "s";
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

const MessageContentContainer = styled.View`
  ${({isMyMessage}) => isMyMessage
    ? `align-items: flex-end;`
    : `align-items: flex-start;`
  }
  width: 100%;
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
  max-width: ${({size}) => {
    if (size === "xl") return "90%";
    if (size === "l") return "80%";
    if (size === "m") return "70%";
    return "65%";
  }};
`;

const PhotosGridContainer = styled.View`
  border-radius: 10px;
  margin-top: 5px;
  margin-left: 5px;
  margin-right: 5px;
  overflow: hidden;
`;

const MessageText = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;