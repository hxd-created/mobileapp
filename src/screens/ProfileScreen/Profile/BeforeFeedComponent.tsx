import React, { useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import styled, { css } from 'styled-components';

import { Avatar } from '../../../components/Avatar';
import userContext from '../../../context/user';
import { Button } from 'react-native';
import CreateStoryBtn from '../../../components/CreateStoryBtn';


export default () => {
  const navigation = useNavigation();
  const { user } = useContext(userContext);
  return (<Container>
    <Card>
      <UserInfoContainer>
        <Avatar avatar={user.avatar} />
        <UserInfoSide>
          <Username>{user.firstname} {user.lastname}</Username>
        </UserInfoSide>
      </UserInfoContainer>
    </Card>
    <CreateStoryBtn avatar={user.avatar} />
  </Container>);
}

const Container = styled.View``;

const Card = styled.View`
  padding: 8px;
  ${({theme}) => css`
    background-color: ${theme.colors.card};
  `}
  margin-bottom: 10px;
`;

const UserInfoContainer = styled.View`
  flex-direction: row;
`;

const UserInfoSide = styled.View`
  margin-left: 8px;
`;

const Username = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-weight: 600;
  font-size: 20px;
`;
