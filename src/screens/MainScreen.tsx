
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
              return (<Ionicons name="md-browsers" {...iconProps} />);
            } else if (route.name === 'Apps') {
              return (<AntDesign name='appstore1' {...iconProps} />);
            } else if (route.name === 'Profile') {
              return (<FontAwesome name="user" {...iconProps} />);
            } else if (route.name === 'Messenger') {
              return (<Ionicons name="ios-chatbubbles" {...iconProps} />);
            } else if (route.name === 'Notifications') {
              return (<Ionicons name="ios-notifications" {...iconProps} />);
            }
            
            // You can return any component that you like here!
            return <AntDesign name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'orange',
          // inactiveTintColor: 'gray',
          showLabel: false,
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
