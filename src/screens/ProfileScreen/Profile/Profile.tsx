import React, { useContext } from 'react';
import styled from 'styled-components';

import userContext from '../../../context/user';
import Feed from '../../../components/Feed';


export default () => {
  const { user } = useContext(userContext);
  
  return (<Feed
    type="owner"
    ownerKind="USER"
    ownerID={`${user.realID}`}
    limit={20}
    BeforeFeedComponent={() => {
      return <Test />
    }}
  />);
}

const Test = styled.View`
  height: 50px;
  background-color: orange;
`;
