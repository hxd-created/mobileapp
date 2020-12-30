import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Profile from './Profile';
import { Button } from 'react-native';


const Stack = createStackNavigator();

export default ({navigation}) => {
  return (<Stack.Navigator>
    <Stack.Screen
      name="Profile.profile.profile"
      component={Profile}
      options={{
        headerRight: (props) => <Button
          onPress={() => navigation.openDrawer()}
          title="Menu"
        />,
      }}
    />
  </Stack.Navigator>);
}