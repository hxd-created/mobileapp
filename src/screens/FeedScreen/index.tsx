import React from 'react';
import styled from 'styled-components/native';

import Feed from '../../components/Feed';


export default () => {
  return (<Container>
    <Boilerplate>Feed screen</Boilerplate>

    <Feed
      type="my"
      limit={10}
    />
  </Container>);
}

const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
`;

const Boilerplate = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;

