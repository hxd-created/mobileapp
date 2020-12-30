import React, { useContext, useState } from 'react';
import { Button } from 'react-native';
import { ReactRelayContext } from 'react-relay';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';
import * as Updates from 'expo-updates';

import refetchViewer from '../../../helpers/refetchViewer';


export default ({navigation}) => {
  const { environment } = useContext(ReactRelayContext);
  const [ updateState, setUpdateState ] = useState("Fetch updates");

  const logout = () => {
    SecureStore.deleteItemAsync("accessToken");
    refetchViewer(environment);
  }

  const fetchUpdates = async () => {
    if(updateState !== "Fetch updates") {
      return;
    }
    setUpdateState("checking for updates...")
    const rsp = await Updates.checkForUpdateAsync()
    if(!rsp.isAvailable) {
      setUpdateState("Fetch updates")
      return;
    }
    
    setUpdateState("New update avaliable. Version: " + rsp.manifest.version);
    await Updates.fetchUpdateAsync();
    setUpdateState("done. reloading")
    await Updates.reloadAsync();
  }

  return (<Container>
    <Boilerplate>Profile screen</Boilerplate>
    <Button 
      onPress={logout}
      title={"Logout"}
    />
    <Button 
      onPress={fetchUpdates}
      title={updateState}
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
