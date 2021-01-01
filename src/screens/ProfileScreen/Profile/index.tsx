import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import userContext from '../../../context/user';

import Profile from './Profile';
import { Button } from 'react-native';


const Stack = createStackNavigator();

export default ({navigation}) => {
  const { user } = useContext(userContext);

  return (<Stack.Navigator>
    <Stack.Screen
      name="Profile.profile.profile"
      component={Profile}
      options={{
        title: `u${user?.realID}`,
        headerRight: (props) => <Button
          onPress={() => navigation.openDrawer()}
          title="Menu"
        />,
      }}
    />
  </Stack.Navigator>);
}