import React from 'react';

import { createDrawerNavigator } from '@react-navigation/drawer';
import styled from 'styled-components/native';

import Profile from './Profile';
import Settings from './Settings';


const Drawer = createDrawerNavigator();

export default () => {

  return (<Drawer.Navigator initialRouteName="Profile.profile" drawerPosition="right">
    <Drawer.Screen name="Profile.profile" component={Profile} />
    <Drawer.Screen name="Profile.settings" component={Settings} />
  </Drawer.Navigator>);
}
