import React from 'react';
import styled from 'styled-components';


export default () => <Container><Boilerplate>profile page</Boilerplate></Container>

const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Boilerplate = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;
