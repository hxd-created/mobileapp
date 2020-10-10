import React from 'react';
import styled from 'styled-components/native';


export default ({paragraph}) => {
  if (paragraph.data === "") return null;
  return (<Text>{paragraph.data}</Text>);
}

const Text = styled.Text`
  color: ${({theme}) => theme.colors.text};
  padding: 10px;
  font-size: 15px;
`;
