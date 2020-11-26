import React from 'react'
import styled, { css } from 'styled-components/native';


export const AppCardListItem = ({icon, title, onPress}) => {
  return (<AppCardListItemContainer activeOpacity={0.8} onPress={onPress}>
    {icon ? <Icon source={{uri: icon.previewURL}} /> : <IconEmpty />}
    <Title numberOfLines={2}>{title}</Title>
  </AppCardListItemContainer>);
}

export const AppCardList = (props) => {
  return (<AppCardListContainer horizontal={true}>
    {props.children}
  </AppCardListContainer>);
}

const AppCardListItemContainer = styled.TouchableOpacity`
  align-items: center;
  padding: 4px;
`;

const Icon = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
`;

const IconEmpty = styled.View`
  width: 60px;
  height: 60px;
  border-radius: 10px;
  overflow: hidden;
  background-color: #000;
`;

const Title = styled.Text`
  margin-top: 4px;
  width: 60px;
  text-align: center;
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
`;

const AppCardListContainer = styled.ScrollView`
  padding-top: 10px;
  padding-bottom: 10px;
`;