import React, { useContext } from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';

import userContext from '../../context/user';

import Dialogues from './Dialogues';
import Chat from './Chat';
import { Dialog } from './models';
import { getDialogueTitle } from './Dialogues/utils';

const Stack = createStackNavigator();

export default () => {
  const { user } = useContext(userContext);

  return (<Stack.Navigator >
    <Stack.Screen
      name="MessengerDialogues"
      component={Dialogues}
      options={{title: "Chats"}}
    />
    {/* <Stack.Screen
      name="MessengerChat"
      component={Chat}
      options={({route}) => {
        const dialog = route.params.dialog as Dialog;
        const title = getDialogueTitle("user", `${user.realID}`, dialog);
        return { title }
      }}
    /> */}
  </Stack.Navigator>);
}

