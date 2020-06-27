import React, { useContext } from 'react';
import { ReactRelayContext } from 'react-relay';
import styled from 'styled-components';
import { Button, Text } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import refetchViewer from '../helpers/refetchViewer';


export default () => {
  const { environment } = useContext(ReactRelayContext);

  return (<Container style={{flex:1}}>
    <Text>main screen</Text>
    <Button
      title="logout"
      onPress={() => {
        SecureStore.deleteItemAsync("accessToken");
        refetchViewer(environment);
      }}
    />
  </Container>);
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;
