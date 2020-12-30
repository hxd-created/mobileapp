import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';
import Settings from './Settings';


const Stack = createStackNavigator();

export default ({navigation}) => {
  return <Stack.Navigator>
    <Stack.Screen
      name="Profile.settings.settings"
      component={Settings}
      options={{
        headerLeft: () => <HeaderBackButton labelVisible={false} onPress={() => navigation.goBack()} />
      }}
    />
  </Stack.Navigator>
}