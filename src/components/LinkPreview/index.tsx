import React from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { createFragmentContainer, graphql } from 'react-relay';

import { openURL } from '../../helpers/linking';


const LinkPreview = ({link, onClose=null}) => {
  const href = `https://soul.ua/away?q=${encodeURIComponent(link.url)}`;

  return (<Container>
    {onClose && <OnClose onClick={onClose}>Видалити</OnClose>}
    {link.cover && <Cover link={link} href={href} />}
    <Body onPress={() => { openURL(href) }}>
      <Host>{link.host}</Host>
      <Title>{link.title}</Title>
      {!link.cover && link.description.length > 10 && <Description>{link.description}</Description>}
    </Body>
  </Container>);
}

const Cover = ({link, href}) => {
  const windowWidth = useWindowDimensions().width;
  const maxHeight = 200;

  if (link.type.startsWith("video") && link.host.endsWith("youtube.com")) {
    return null;
    // return (<YouTube link={link} />);
  }

  if (!link.cover) {
    return null;
  }

  let coverWidth, coverHeight = 0;
  if (link.cover.width > link.cover.height) {
    const ratio = link.cover.width/link.cover.height;
    coverWidth = windowWidth
    coverHeight = coverWidth/ratio;
  }
  
  if (coverHeight === 0 || coverHeight > maxHeight) {
    coverHeight = maxHeight;
    coverWidth = windowWidth;
  }

  return (<CoverContainer style={{width: coverWidth, height: coverHeight}} onPress={() => { openURL(href) }}>
    <CoverImg
      source={{uri: link.cover.mediumURL}}
      resizeMode="cover"
      style={{width: coverWidth, height: coverHeight}}
    />
  </CoverContainer>);
}

export default createFragmentContainer(LinkPreview, {
  link: graphql`
    fragment LinkPreview_link on Link {
      id
      url
      host
      type
      title
      description
      cover {
        mediumURL
        width
        height
      }
      # ...YouTube_link
    }
  `,
});

const Container = styled.View`
  
`;

const OnClose = styled.View`
  position: absolute;
  right: 10px;
  top: 10px;
  padding: 3px;
  background-color: #000;
  color: #fff;
  z-index: 10;
`;

const Body = styled.TouchableOpacity`
  margin: 10px;
`;

const Host = styled.Text`
  text-transform: uppercase;
  color: ${({theme}) => theme.colors.text};
`;

const Title = styled.Text`
  padding: 0;
  margin: 0;
  /* font-size: 13; */
  font-weight: bold;
  color: ${({theme}) => theme.colors.text};
  text-decoration: none;
`;

const Description = styled.Text`
  color: ${({theme}) => theme.colors.text};
  text-decoration: none;
`;

const CoverContainer = styled.TouchableOpacity`
  background-color: #fff;
`;

const CoverImg = styled.Image`
`;
