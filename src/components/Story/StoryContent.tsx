import React from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';

import Generic from './Paragraph/Generic';
import Attachments from './Attachments';


const StoryContent = ({story}) => {
  return (<Container>
    {story.paragraphs.map((paragraph, index) => (<Generic
      key={`${story.id}-${index}`}
      story={story}
      paragraph={paragraph}
    />))}
    {story.attachments.length > 0 && <Attachments attachments={story.attachments} />}
  </Container>);
}

export default createFragmentContainer(StoryContent, {
  story: graphql`
    fragment StoryContent_story on Story {
      paragraphs {
        ...Generic_paragraph
      }
      attachments {
        __typename
        ...Attachments_attachments
      }
      ...Generic_story
    }
  `,
});


const Container = styled.View`
  /* flex: 1; */
  flex-grow: 1;
`;
