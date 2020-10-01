import React from 'react';
import styled from 'styled-components/native';


export default ({retry, error}) => {
  return (<Container>
    <Heading>Error</Heading>
    <Button onPress={retry} title="Retry" />
  </Container>);
}

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;

const Button = styled.Button``;
