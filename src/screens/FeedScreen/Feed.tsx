import React from 'react';
import styled from 'styled-components/native';

import Feed from '../../components/Feed';


export default ({type, rubricID=null}) => {
  return (<Container>
    <Feed
      type={type}
      rubricID={rubricID}
      limit={10}
    />
  </Container>);
}


const Container = styled.View`
  flex: 1;
  justify-content: center;
`;
