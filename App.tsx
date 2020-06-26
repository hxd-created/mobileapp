import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Text, Image } from 'react-native';
import styled from 'styled-components/native';


export default function App() {
  return (
    <Container>
      <StatusBar style="auto" />
      <Logo source={require("./assets/logo-circle.png")} />
    </Container>
  );
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