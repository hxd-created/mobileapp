import React from 'react';
import { createStackNavigator, HeaderBackButton } from '@react-navigation/stack';

import i18n from 'i18n-js';

import Settings from './Settings';


const Stack = createStackNavigator();

export default ({navigation}) => {
  return <Stack.Navigator>
    <Stack.Screen
      name="Profile.settings.settings"
      component={Settings}
      options={{
        title: i18n.t("profile.settings.title"),
        headerLeft: () => <HeaderBackButton labelVisible={false} onPress={() => navigation.goBack()} />
      }}
    />
  </Stack.Navigator>
}