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
      <Title to={href} target="_blank">{link.title}</Title>
      {!link.cover && link.description.length > 10 && <Description to={href} target="_blank">{link.description}</Description>}
    </Body>
  </Container>);
}

const Cover = ({link, href}) => {
  const windowWidth = useWindowDimensions().width;

  if (link.type.startsWith("video") && link.host.endsWith("youtube.com")) {
    return null;
    // return (<YouTube link={link} />);
  }

  return (<CoverContainer to={href} target="_blank">
    <CoverImg source={{uri: link.cover.mediumURL}} style={{width: windowWidth}}/>
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
      }
      # ...YouTube_link
    }
  `,
});

const Container = styled.View`
  flex: 1;
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
  flex: 1;
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
  color: ${({theme}) => theme.colors.font};
  text-decoration: none;
`;

const CoverContainer = styled.Text`
`;

const CoverImg = styled.Image`
  flex: 1;
  height: 150px;
`;
