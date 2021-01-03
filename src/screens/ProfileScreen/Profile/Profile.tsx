import React, { useContext } from 'react';
import styled from 'styled-components';

import userContext from '../../../context/user';
import Feed from '../../../components/Feed';

import BeforeFeedComponent from './BeforeFeedComponent';


export default () => {
  const { user } = useContext(userContext);
  
  return (<Feed
    type="owner"
    ownerKind="USER"
    ownerID={`${user.realID}`}
    limit={20}
    BeforeFeedComponent={() => <BeforeFeedComponent />}
  />);
}

const Test = styled.View`
  height: 50px;
  background-color: orange;
`;
