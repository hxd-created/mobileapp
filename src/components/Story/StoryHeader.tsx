import React from 'react';
import styled from 'styled-components'
import { createFragmentContainer, graphql } from 'react-relay';

import Avatar from '../Avatar';
import PublicationTime from '../PublicationTime';


const StoryHeader = ({story}) => {
  return (<Container>
    <Avatar avatar={story.publisher.avatar} />
    <PubslishedDetails>
      <Publisher>{story.publisher.title}</Publisher>
      <Datetime><PublicationTime time={story.createdAt} /></Datetime>
    </PubslishedDetails>
  </Container>);
}

export default createFragmentContainer(StoryHeader, {
  story: graphql`
    fragment StoryHeader_story on Story {
      createdAt
      realID
      canIManipulate
      publisher {
        __typename
        ... on User {
          id
          title:display_name
          realID
          avatar {
            id
            ...Avatar_avatar
          }
        }
        ... on Community {
          id
          title
          realID
          avatar {
            id
            ...Avatar_avatar
          }
        }
      }
    }
  `,
});

const Container = styled.View`
  flex-direction: row;
  padding: 6px;
`;

const PubslishedDetails = styled.View`
  flex: 1;
  margin-left: 6px;
  justify-content: center;
`;

const Publisher = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: ${({theme}) => theme.colors.text};
`;

const Datetime = styled.Text`
  color: ${({theme}) => theme.colors.text};
  margin-top: 4px;
`;
