import { getAppLoadingLifecycleEmitter } from 'expo/build/launch/AppLoading';
import React, { FunctionComponent, useContext } from 'react';
import styled, { } from 'styled-components/native';
import userContext from '../../../context/user';

import { Dialog, DialogType, Message } from '../models';
import { getDialogueAvatar, getDialogueTitle, getMessagePreviewText, getMessageSender } from './utils';


export interface ComponentProps {
  dialog: Dialog
  onSelect: () => void
}

const Component: FunctionComponent<ComponentProps> = ({dialog, onSelect}) => {
  const { user } = useContext(userContext);
  const viewerObjectKind = "user";
  const viewerObjectID = `${user.realID}`;
  
  const dialogAvatar = getDialogueAvatar(viewerObjectKind, viewerObjectID, dialog);
  const dialogTitle = getDialogueTitle(viewerObjectKind, viewerObjectID, dialog);

  return <Container onPress={onSelect}>
    {dialogAvatar && <AvatarImage source={{uri: dialogAvatar.previewURL}}/>}
    {!dialogAvatar && <AvatarEmpty />}
    <ChatInfoContainer>
      <ChatTitleContainer>
        <ChatTitle numberOfLines={1}>{dialogTitle}</ChatTitle>
          {
            dialog.type === DialogType.GROUP &&
            dialog.lastMessage.__typename === "Message" &&
            <LastMessageSender numberOfLines={1}>{getMessageSender(dialog.lastMessage as Message, dialog.participants)?.object.displayName}</LastMessageSender>
          }
        <LastMessagePreview numberOfLines={dialog.type === DialogType.GROUP ? 1 : 2}>{getMessagePreviewText(dialog.lastMessage)}</LastMessagePreview>
      </ChatTitleContainer>
    </ChatInfoContainer>
  </Container>
}
export default Component;

const Container = styled.TouchableOpacity`
  padding: 5px;
  flex: 1;
  flex-direction: row;
  height: 76px;
  background-color: ${({theme}) => theme.colors.card};
`;

const AvatarImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-right: 10px;
`;

const AvatarEmpty = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 60px;
  margin-right: 10px;
  background-color: #ccc;
`;

const ChatInfoContainer = styled.View`
  flex: 1;
  border-bottom-color: ${({theme}) => theme.colors.border};
  border-bottom-width: 1px;
`;

const ChatTitleContainer = styled.View`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 22px;
`;

const ChatTitle = styled.Text`
  line-height: 22px;
  font-size: 16px;
  font-weight: 500;
  color: ${({theme}) => theme.colors.text};
`;

const LastMessageSender = styled.Text`
  color: ${({theme}) => theme.colors.text};
  line-height: 20px;
  font-weight: 500;
`;

const LastMessagePreview = styled.Text`
  color: ${({theme}) => theme.colors.text};
  line-height: 20px;
`;