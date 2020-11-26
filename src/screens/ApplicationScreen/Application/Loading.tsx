import React from 'react';
import { ActivityIndicator, Button } from 'react-native';
import styled, { css } from 'styled-components/native';

export default ({isLoading, hasError = false, retry=null, icon = null, label=null}) => {
  const iconSource = icon && icon.previewURL ? {uri: icon.previewURL} : null;
  return (<Container>
    {hasError && retry && <Button
      onPress={retry}
      title={"Retry"}
    />}

    <Content>
      {iconSource && <Icon source={iconSource} />}
      {label && <Label>{label}</Label>}
    </Content>

    <Footer>
      <ActivityIndicator color="orange" />
    </Footer>
  </Container>);
}

const Container = styled.SafeAreaView`
  flex: 1;
  ${({theme}) => css`
    background-color: ${theme.colors.background};
  `}
`

const Label = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
  font-size: 20px;
`;

const Content = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Footer = styled.View`
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
`;

const Icon = styled.Image`
  width: 50px;
  height: 50px;
  border-radius: 10px;
  overflow: hidden;
`;