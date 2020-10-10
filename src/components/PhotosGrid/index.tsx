import React from 'react';
import { createFragmentContainer } from 'react-relay';
import styled from 'styled-components';


const PhotosGrid = ({photos, containerWidth}) => {
  const borderWidth = 4;
  const photosCount = photos.length;

  let photosGrid;
  if (photosCount === 1) {
    const maxHeight = 450;

    const photo = photos[0];
    let width, height = 0;
    if (photo.width > photo.height) {
      const ratio = photo.width/photo.height;
      width = containerWidth
      height = width/ratio;
    }
    
    if (height === 0 || height > maxHeight) {
      height = maxHeight;
      width = containerWidth;
    }
    photosGrid = <PhotoImage
      source={{uri: photo.mediumURL}}
      resizeMode="cover"
      style={{width, height}}
    />
  } else if(photosCount === 2) {
    const height = 250;
    const width = Math.round((containerWidth - borderWidth) / 2);
    
    photosGrid = <Row>
      <PhotoImage
        source={{uri: photos[0].mediumURL}}
        resizeMode="cover"
        style={{width, height, marginRight: borderWidth}}
      />
      <PhotoImage
        source={{uri: photos[1].mediumURL}}
        resizeMode="cover"
        style={{width, height}}
      />
    </Row>
  } else if(photosCount === 3) {
    const halfWidth = Math.round((containerWidth - borderWidth) / 2);
    photosGrid = <>
      <Row>
        <PhotoImage
          source={{uri: photos[0].mediumURL}}
          resizeMode="cover"
          style={{width: containerWidth, height: 200}}
        />
      </Row>
      <Row style={{marginTop: borderWidth}}>
        <PhotoImage
          source={{uri: photos[1].mediumURL}}
          resizeMode="cover"
          style={{width: halfWidth, height: halfWidth, marginRight: borderWidth}}
        />
        <PhotoImage
          source={{uri: photos[2].mediumURL}}
          resizeMode="cover"
          style={{width:halfWidth, height: halfWidth}}
        />
      </Row>
    </>
  } else if(photosCount === 4) {
    const thirdWidth = Math.round((containerWidth - borderWidth * 2) / 3);
    photosGrid = <>
      <Row>
        <PhotoImage
          source={{uri: photos[0].mediumURL}}
          resizeMode="cover"
          style={{width: containerWidth, height: 250}}
        />
      </Row>
      <Row style={{marginTop: borderWidth}}>
        <PhotoImage
          source={{uri: photos[1].mediumURL}}
          resizeMode="cover"
          style={{width: thirdWidth, height: thirdWidth, marginRight: borderWidth}}
        />
        <PhotoImage
          source={{uri: photos[2].mediumURL}}
          resizeMode="cover"
          style={{width: thirdWidth, height: thirdWidth, marginRight: borderWidth}}
        />
        <PhotoImage
          source={{uri: photos[3].mediumURL}}
          resizeMode="cover"
          style={{width:thirdWidth, height: thirdWidth}}
        />
      </Row>
    </>
  } else {
    const halfWidth = Math.round((containerWidth - borderWidth) / 2);
    const thirdWidth = Math.round((containerWidth - borderWidth * 2) / 3);
    const restPhotosCount = photosCount - 5;
    photosGrid = <>
      <Row>
        <PhotoImage
          source={{uri: photos[0].mediumURL}}
          resizeMode="cover"
          style={{width: halfWidth, height: halfWidth, marginRight: borderWidth}}
        />
        <PhotoImage
          source={{uri: photos[1].mediumURL}}
          resizeMode="cover"
          style={{width: halfWidth, height: halfWidth}}
        />
      </Row>
      <Row style={{marginTop: borderWidth}}>
        <PhotoImage
          source={{uri: photos[2].mediumURL}}
          resizeMode="cover"
          style={{width: thirdWidth, height: thirdWidth, marginRight: borderWidth}}
        />
        <PhotoImage
          source={{uri: photos[3].mediumURL}}
          resizeMode="cover"
          style={{width: thirdWidth, height: thirdWidth, marginRight: borderWidth}}
        />
        <PhotoImage
          source={{uri: photos[4].mediumURL}}
          resizeMode="cover"
          style={{width:thirdWidth, height: thirdWidth}}
        >
          {restPhotosCount > 0 && <MorePhotos style={{width:thirdWidth, height: thirdWidth}}>
            <MorePhotosLabel>+{restPhotosCount}</MorePhotosLabel>
          </MorePhotos>}
        </PhotoImage>
      </Row>
    </>
  }

  return (<Container>
    {photosGrid}
  </Container>);
}

export default createFragmentContainer(PhotosGrid, {
  photos: graphql`
    fragment PhotosGrid_photos on Photo @relay(plural: true) {
      id
      mediumURL
      width
      height
    }
  `,
})

const Container = styled.View``;

const Row = styled.View`
  flex-direction: row;
`;

const PhotoImage = styled.ImageBackground``;

const MorePhotos = styled.View`
  background-color: #000;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
`;

const MorePhotosLabel = styled.Text`
  color: #fff;
  font-weight: 500;
  font-size: 25px;
`;
