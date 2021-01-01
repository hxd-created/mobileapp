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
  />);
}

const Container = styled.ScrollView`
  flex: 1;
`;
