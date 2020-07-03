import React from 'react';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';


const Avatar = ({avatar, type }) => {
  let imageSource: any = null;
  if (avatar) {
    imageSource = { uri: avatar.previewURL };
  }
  return (<AvatarImage
    source={imageSource}
  />);
}

export default createFragmentContainer(Avatar, {
  avatar: graphql`
    fragment Avatar_avatar on Photo {
      previewURL
    }
  `,
});

const AvatarImage = styled.Image`
  width: 64px;
  height: 64px;
  border-radius: 64px;
  background-color: #ccc;
`;
