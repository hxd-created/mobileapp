import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import TabBar from './TabBar';
import NewsFeed from './NewsFeed';
import RubricsFeed from './RubricsFeed'


const Stack = createMaterialTopTabNavigator();

export default () => {
  return (<Stack.Navigator tabBar={props => <TabBar {...props} />}>
    <Stack.Screen name="NewsFeed" component={NewsFeed} />
    <Stack.Screen name="Rubrics" component={RubricsFeed} />
  </Stack.Navigator>);
}
