import React from 'react';
import { useWindowDimensions, View, Text } from 'react-native';
import { createFragmentContainer, graphql } from 'react-relay';
import styled from 'styled-components/native';
import Swiper from 'react-native-swiper'


const PhotosParagraph = ({attachments}) => {
  const windowWidth = useWindowDimensions().width;

  const photos = attachments
    .filter(attach => attach.__typename === "Photo")
    .sort((a,b) => a.realID - b.realID);

  return (<SwiperStyled style={{height: windowWidth}} showsButtons={false}>
    {photos.map((photo) => (<Slide key={photo.id} style={{height: windowWidth}}>
      <PhotoImage
        source={{uri: photo.mediumURL}}
        resizeMode="contain"
        style={{height: windowWidth}}
      />
    </Slide>))}
  </SwiperStyled>);
}

export default createFragmentContainer(PhotosParagraph, {
  attachments: graphql`
    fragment PhotosParagraph_attachments on StoryAttachment @relay(plural: true) {
      __typename
      ... on Photo {
        id
        realID
        previewURL
        mediumURL
      }
    }
  `,
});

const SwiperStyled = styled(Swiper)`
`;

const Slide = styled.View`
`;

const PhotoImage = styled.Image`
`;
