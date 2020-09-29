import React, { useContext } from 'react'
import { createFragmentContainer, graphql } from 'react-relay';
import { View, Text } from 'react-native';

import userContext from "../../../context/user";

import { Dialog } from '../models';
import { getDialogueTitle } from './utils';


const Dialogues = ({ dialogs } : { dialogs: Dialog[]}) => {
  const { user } = useContext(userContext);

  return <View>
    {dialogs.map(dialog => {
      return (<Text key={dialog.id}>{getDialogueTitle(user.id, dialog)}</Text>);
    })}
  </View>
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
            display_name
            avatar{
              id
              mediumURL
            }
          }
          ... on Community{
            title
            avatar{
              id
              mediumURL
            }
          }
        }
        role
      }
      myRole
    }
  `,
});