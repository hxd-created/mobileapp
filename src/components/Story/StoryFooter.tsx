import React from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';


import VotingBtn from './VotingBtn';


const StoryFooter = ({story}) => {
  return (<Container>
      <VotingBtn vote={story.vote} />
    </Container>);
}

export default createFragmentContainer(StoryFooter, {
  story: graphql`
    fragment StoryFooter_story on Story {
      vote {
        ...VotingBtn_vote
      }
    }
  `,
});

const Container = styled.View`
  flex:1;
  min-height:20px;
  min-width: 50px;
`;
