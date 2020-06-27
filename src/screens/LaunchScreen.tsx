import React from 'react';
import styled from 'styled-components/native';


export default () => {
  return (<Container>
    <Logo source={require("../assets/logo-circle.png")} />
  </Container>);
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
