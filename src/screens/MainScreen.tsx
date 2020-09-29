
import * as React from 'react';
import { ThemeProvider } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useColorScheme } from 'react-native-appearance';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import { Ionicons, AntDesign, FontAwesome } from '@expo/vector-icons';

import NewsFeedIcon from '../components/Icons/NewsFeedIcon';
import ServicesIcon from '../components/Icons/ServicesIcon';
import ProfileIcon from '../components/Icons/ProfileIcon';
import MessagesIcon from '../components/Icons/MessagesIcon';
import NotificationsIcon from '../components/Icons/NotificationsIcon';

import FeedScreen from './FeedScreen';
import AppsScreen from './AppsScreen';
import ProfileScreen from './ProfileScreen';
import MessengerScreen from './MessengerScreen';
import NotificationsScreen from './NotificationsScreen';


const Tab = createBottomTabNavigator();

export default () => {
  const scheme = useColorScheme();

  /* theme Object {
    "colors": Object {
      "background": "rgb(242, 242, 242)",
      "border": "rgb(224, 224, 224)",
      "card": "rgb(255, 255, 255)",
      "primary": "rgb(0, 122, 255)",
      "text": "rgb(28, 28, 30)",
    },
    "dark": false,
  } */
  const theme = scheme === 'dark' ? DarkTheme : DefaultTheme;

  return (<ThemeProvider theme={theme}>
    <NavigationContainer theme={theme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            const iconProps = { size: size+6, color };
            if (route.name === 'Feed') {
              return (<NewsFeedIcon {...iconProps} />);
            } else if (route.name === 'Apps') {
              return (<ServicesIcon {...iconProps} />);
            } else if (route.name === 'Profile') {
              return (<ProfileIcon {...iconProps} />);
            } else if (route.name === 'Messenger') {
              return (<MessagesIcon {...iconProps} />);
            } else if (route.name === 'Notifications') {
              return (<NotificationsIcon {...iconProps} />);
            }

            return null;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          // inactiveTintColor: 'gray',
          showLabel: true,
        }}
      >
        <Tab.Screen name="Feed" component={FeedScreen} />
        <Tab.Screen name="Apps" component={AppsScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Messenger" component={MessengerScreen} />
        <Tab.Screen name="Notifications" component={NotificationsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  </ThemeProvider>);
}
