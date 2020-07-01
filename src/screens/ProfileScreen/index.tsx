import React, { useContext } from 'react';
import { Button } from 'react-native';
import { ReactRelayContext } from 'react-relay';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';

import refetchViewer from '../../helpers/refetchViewer';


export default () => {
  const { environment } = useContext(ReactRelayContext);
  const logout = () => {
    SecureStore.deleteItemAsync("accessToken");
    refetchViewer(environment);
  }

  return (<Container>
    <Boilerplate>Profile screen</Boilerplate>
    <Button 
      onPress={logout}
      title={"Logout"}
    />
  </Container>);
}

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Boilerplate = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;
