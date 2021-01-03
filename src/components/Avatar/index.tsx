import React from 'react';
import styled, { css } from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';


export const Avatar = ({avatar=null, type=null, size=64 }) => {
  let imageSource: any = null;
  if (avatar) {
    imageSource = { uri: avatar.previewURL };
  }
  return (<AvatarImage
    source={imageSource}
    size={size}
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
  ${({size=64}) => css`
    width: ${size}px;
    height: ${size}px;
  `}
  border-radius: 64px;
  background-color: #ccc;
`;
