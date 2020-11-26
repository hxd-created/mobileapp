import React from 'react';
import styled, { css } from 'styled-components/native';
import ChevronRightIcon from '../../components/Icons/ChevronRight';


export default ({iconSource, title, subtitleComponent=null, onPress}) => {
  return (<CardContainer onPress={onPress} activeOpacity={0.8}>
    <Heading>
      <Icon source={iconSource} />
      <Title>{title}</Title>
      {subtitleComponent && subtitleComponent}
      <ChevronRightIcon />
    </Heading>
  </CardContainer>);
}

const CardContainer = styled.TouchableOpacity`
  border-radius: 10px;
  min-height: 20px;
  margin: 10px;
  padding: 10px;
  ${({theme}) => css`
    background-color: ${theme.colors.card};
  `}
`;

const Heading = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.Image`
  width: 28px;
  height: 28px;
  border-radius: 6px;
  overflow: hidden;
`;

const Title = styled.Text`
  flex: 1;
  font-size: 20px;
  font-weight: 900;
  padding-left: 10px;
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
`;