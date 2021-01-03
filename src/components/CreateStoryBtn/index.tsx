import React from 'react';
import styled, { css } from 'styled-components';
import { useNavigation } from '@react-navigation/native';
import i18n from 'i18n-js';

import { Avatar } from '../Avatar';


export default ({avatar}) => {
  const navigation = useNavigation();

  return (<Container onPress={() => navigation.navigate('CreateStoryModal')}>
    <Avatar size={36} avatar={avatar} />
    <Placeholder>{i18n.t("feed.createStoryBtnPlaceholder")}</Placeholder>
  </Container>);
}

const Container = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.colors.card};
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Placeholder = styled.Text`
  flex: 1;
  border-radius: 10px;
  overflow: hidden;
  line-height: 40px;
  ${({theme}) => css`
    color: ${theme.colors.text};
    background-color: ${theme.colors.background};
  `}
  margin-left: 10px;
  padding-left: 10px;
`;