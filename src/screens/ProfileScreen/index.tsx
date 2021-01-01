import React, { useContext } from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import i18n from 'i18n-js';

import userContext from '../../context/user';

import Profile from './Profile';
import Settings from './Settings';


const Drawer = createDrawerNavigator();

export default () => {
  return (<Drawer.Navigator initialRouteName="Profile.profile" drawerPosition="right">
    <Drawer.Screen name="Profile.profile" component={Profile} />
    <Drawer.Screen name="Profile.settings" component={Settings} />
  </Drawer.Navigator>);
}
