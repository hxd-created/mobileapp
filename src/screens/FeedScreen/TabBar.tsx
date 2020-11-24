import React from 'react';
import styled from 'styled-components';
import { useTheme } from '@react-navigation/native';
import { TabBar } from 'react-native-tab-view';
import Constants from 'expo-constants';


export default (props) => {
  const theme = useTheme();
  const {
    style,
    labelStyle,
    ...rest
  } = props;

  return (<TabBar
    {...rest}
    style={[{backgroundColor: theme.colors.card, paddingTop: Constants.statusBarHeight}, style]}
    renderLabel={({ route, focused }) => (
      <Label focused={focused}>
        {route.name === 'NewsFeed' ? "Новини" : "Цікаве"}
      </Label>
    )}
    indicatorStyle={{ backgroundColor: 'orange' }}
  />);
}

const Label = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-size: 17px;
  font-weight: 500;
  opacity: ${({focused}) => focused ? 1 : 0.5};
`;
