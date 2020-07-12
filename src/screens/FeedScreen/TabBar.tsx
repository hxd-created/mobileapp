import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@react-navigation/native';
import { TabBar } from 'react-native-tab-view';

import SafeAreaView from '../../components/SafeAreaView';


export default (props) => {
  const theme = useTheme();
  const {
    style,
    labelStyle,
    ...rest
  } = props;

  return (<Container>
    <TabBar
      {...rest}
      style={[{backgroundColor: theme.colors.card}, style]}
      renderLabel={({ route, focused }) => (
        <Label focused={focused}>
          {route.name === 'NewsFeed' ? "Новини" : "Цікаве"}
        </Label>
      )}
      indicatorStyle={{ backgroundColor: 'orange' }}
    />
  </Container>);
}

const Container = styled(SafeAreaView)`
  background-color: ${({theme}) => theme.colors.card};
`;

const Label = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 17px;
  font-weight: 500;
  opacity: ${({focused}) => focused ? 1 : 0.5};
`;
