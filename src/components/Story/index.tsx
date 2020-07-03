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
    }
  `,
})

const Container = styled.View`
  min-height: 200px;
  background-color: ${({theme}) => theme.colors.card};
  margin-bottom: 10px;
`;

const Placeholder = styled.Text``;