import React from 'react';
import styled from 'styled-components';
import { Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';


export default () => {
  return (<Container style={{flex:1}}>
    <Text>main screen</Text>
    <Button
      title="logout"
      onPress={() => {
        SecureStore.deleteItemAsync("accessToken")
      }}
    />
  </Container>);
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
