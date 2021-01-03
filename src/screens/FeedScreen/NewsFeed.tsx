import React, { useContext } from 'react';
import styled from 'styled-components';

import userContext from '../../context/user';
import CreateStoryBtn from '../../components/CreateStoryBtn';
import Feed from './Feed';


export default () => {
  const { user } = useContext(userContext);

  return (<Feed
    type="my"
    BeforeFeedComponent={() => <BeforeFeedComponentStyled>
      <CreateStoryBtn avatar={user.avatar} />
    </BeforeFeedComponentStyled>}
  />);
}

const BeforeFeedComponentStyled = styled.View`
  margin-top: 10px;
`;
