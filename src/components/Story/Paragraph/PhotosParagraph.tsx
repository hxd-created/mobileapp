import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import PhotosGrid from '../../PhotosGrid';


const PhotosParagraph = ({attachments}) => {
  const windowWidth = useWindowDimensions().width;

  const photos = attachments
    .filter(attach => attach.__typename === "Photo")
    .sort((a,b) => a.realID - b.realID);

  return (<PhotosGrid containerWidth={windowWidth} photos={photos} />);
}

export default createFragmentContainer(PhotosParagraph, {
  attachments: graphql`
    fragment PhotosParagraph_attachments on StoryAttachment @relay(plural: true) {
      __typename
      ... on Photo {
        ...PhotosGrid_photos
      }
    }
  `,
});

