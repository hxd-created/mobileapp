import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';

import getEnvironment from './environment';

import UserContext, { UserInContext } from './context/user';

import LaunchScreen from './screens/LaunchScreen';
import MainScreen from './screens/MainScreen';
import LoginScreen from './screens/LoginScreen';


const environment = getEnvironment();

const __query = graphql`
  query AppQuery {
    passport {
      viewer {
        id
        realID
        firstname
        lastname
      }
    }
  }
`;

export default function App() {
  
  return (<ReactRelayContext.Provider value={{environment, variables: {}}}>
    <StatusBar style="auto" />
    <QueryRenderer
      environment={environment}
      query={__query}
      render={({error, props}) => {
        if (error) {
          console.log('error', error);
          alert("Error");
        }
        if (!props) {
          return (<LaunchScreen />);
        }

        const userContextValue: UserInContext = {
          isAuthenticated: props.passport.viewer !== null,
          user: null,
        };
        console.log("context", userContextValue);
        return (<UserContext.Provider value={userContextValue}>
          {userContextValue.isAuthenticated
            ? <MainScreen />
            : <LoginScreen />
          }
        </UserContext.Provider>);
      }}
    />
  </ReactRelayContext.Provider>);
}

