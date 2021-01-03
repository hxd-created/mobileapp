import React from 'react';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';

import SafeAreaView from '../../components/SafeAreaView';
import DismissIcon from '../../components/Icons/Dismiss';
import SendIcon from '../../components/Icons/WritebarSend';


export default () => {
  const navigation = useNavigation();

  const title = "title user/community";

  return (<SafeAreaView>
    <Header>
      <HeaderBtn
        onPress={() => navigation.goBack()}
      ><DismissIcon /></HeaderBtn>
      <Title>{title}</Title>
      <HeaderBtn
      ><SendIcon /></HeaderBtn>
    </Header>
  </SafeAreaView>);
}


const Header = styled.View`
  flex-direction: row;
`;

const HeaderBtn = styled.TouchableOpacity`
  margin: 10px;
`;

const Title = styled.Text`
  flex: 1;
  align-items: center;
  justify-content: center;
  color: ${({theme}) => theme.colors.text};
`;
