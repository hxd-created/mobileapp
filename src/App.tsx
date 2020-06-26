import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ReactRelayContext } from 'react-relay';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';

import GraphqlTest from './GraphqlTest';
import getEnvironment from './environment';


const environment = getEnvironment();

export default function App() {
  return (<ReactRelayContext.Provider value={{environment, variables: {}}}>
    <Container>
      <StatusBar style="auto" />
      <GraphqlTest />
      <Logo source={require("./assets/logo-circle.png")} />
    </Container>
  </ReactRelayContext.Provider>);
}

const Container = styled.View`
  flex: 1;
  background-color: orange;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.Image`
  width: 100%;
`;