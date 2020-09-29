import React from 'react';
import { ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';


export default () => {
  return <Container>
    <ActivityIndicator />
  </Container>
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;