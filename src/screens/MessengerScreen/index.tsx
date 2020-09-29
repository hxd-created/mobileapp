import React from 'react';
import styled from 'styled-components/native';

import {
  createStackNavigator,
} from '@react-navigation/stack';

import Dialogues from './Dialogues';
import Chat from './Chat';

const Stack = createStackNavigator();

export default () => {
  return (<Stack.Navigator>
    <Stack.Screen
      name="Dialogues"
      component={Dialogues}
      options={{title: "Messages"}}
    />
    <Stack.Screen name="Chat" component={Chat} />
  </Stack.Navigator>);
}

