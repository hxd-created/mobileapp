import React from 'react';
import styled from 'styled-components/native';


export default () => {
  return (<Container>
    <Boilerplate>Notifications screen</Boilerplate>
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
