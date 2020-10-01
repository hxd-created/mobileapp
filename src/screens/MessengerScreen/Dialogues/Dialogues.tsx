import React, { FunctionComponent, useContext } from 'react'
import { createFragmentContainer, graphql } from 'react-relay';
import { View, Text } from 'react-native';
import styled from 'styled-components/native';

import userContext from "../../../context/user";

import { Dialog } from '../models';
import { getDialogueTitle } from './utils';
import DialogueItem from './DialogueItem';

export interface ComponentProps {
  dialogs: Dialog[]
  openDialog: (Dialog) => void
}

const Dialogues: FunctionComponent<ComponentProps> = ({ dialogs, openDialog }) => {
  return <Container>
    {dialogs.map(dialog => <DialogueItem
      key={dialog.id}
      dialog={dialog}
      onSelect={() => openDialog(dialog)}
    />)}
  </Container>
}

export default createFragmentContainer(Dialogues, {
  dialogs: graphql`
    fragment Dialogues_dialogs on Dialog @relay(plural: true) {
      id
      title
      type
      unreadCount
      participantsCount
      participants{
        objectKind
        objectID
        object{
          __typename
          ... on User{
            displayName:display_name
            avatar{
              id
              previewURL
            }
          }
          ... on Community{
            displayName:title
            avatar{
              id
              previewURL
            }
          }
        }
        role
      }
      lastMessage {
        __typename
        ... on Message {
          id
          senderKind
          senderID
          sentAt
          text
          # attachments
          replyToMessage {
            id
            senderKind
            senderID
            sentAt
            text
          }
        }
        ... on MessageInit {
          id
          sentAt
        }
        ... on MessageJoin {
          id
          sentAt
          participant {
            objectKind
            objectID
            object{
              __typename
              ... on User{
                displayName:display_name
                avatar{
                  id
                  previewURL
                }
              }
              ... on Community{
                displayName:title
                avatar{
                  id
                  previewURL
                }
              }
            }
            role
          }
        }
      }
      myRole
    }
  `,
});

const Container = styled.ScrollView`
  flex: 1;
`;