import React from 'react';
import { graphql, createFragmentContainer } from 'react-relay';

import Text from './Text';
import Poster from './Poster';
import Photos from './PhotosParagraph';

const Paragraph = (props) => {
  const {
    paragraph,
    story,
    fullView,
  } = props;
  const { attachments } = story;
  
  let P;
  switch (paragraph.type) {
    case "text":
      P = Text;
      break;
    case "poster":
      P = Poster;
      break;
    case "photos":
      P = Photos;
      break;
    default:
      break;
  }
  if (!P) return null;

  return (<P paragraph={paragraph} attachments={attachments} fullView={fullView} />);
}

export default createFragmentContainer(Paragraph, {
  paragraph: graphql`
    fragment Generic_paragraph on Paragraph {
      type
      data
      order
    }
  `,
  story: graphql`
    fragment Generic_story on Story {
      attachments {
        __typename
        ... on Poster {
          owner {
            __typename
          }
          objectID:object_id
          fontColor:font_color
        }
        ...PhotosParagraph_attachments
      }
    }
  `,
});
