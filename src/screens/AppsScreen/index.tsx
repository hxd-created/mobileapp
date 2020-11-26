import React from 'react';
import {
  createStackNavigator,
} from '@react-navigation/stack';

import Hub from './Hub';


const Stack = createStackNavigator();

export default () => {
  return (<Stack.Navigator>
    <Stack.Screen
      name="Hub"
      component={Hub}
      options={{title: "Hub"}}
    />
  </Stack.Navigator>);
}
