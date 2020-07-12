import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import styled from 'styled-components';
import LinkPreview from '../LinkPreview';


const Attachments = ({attachments}) => {
  return (<Container>
    {attachments.map(attach => {  // here we should ignore Story type
      // console.log('attach type', attach.__typename);
      if (attach.__typename === "Link") {
        return (<LinkPreview key={attach.id} link={attach} />);
      }
      return null;
    })}
  </Container>);
}


export default createFragmentContainer(Attachments, {
  attachments: graphql`
    fragment Attachments_attachments on StoryAttachment @relay(plural: true) {
      __typename
      ... on Link {
        id
        ...LinkPreview_link
      }
    }
  `,
});

const Container = styled.View``;
