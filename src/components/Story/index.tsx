import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import styled from 'styled-components';

import StoryHeader from './StoryHeader';
import StoryContent from './StoryContent';


const Story = ({story}) => {
  return (<Container>
    <StoryHeader story={story} />
    <StoryContent story={story} />
  </Container>)
}

export default createFragmentContainer(Story, {
  story: graphql`
    fragment Story_story on Story {
      id
      realID
      publisher {
        __typename
      }
      ...StoryHeader_story
      ...StoryContent_story
    }
  `,
})

const Container = styled.View`
  background-color: ${({theme}) => theme.colors.card};
`;

const Placeholder = styled.Text``;