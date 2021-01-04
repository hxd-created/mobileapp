import React from 'react';
import { SvgXml } from 'react-native-svg';


const iconXML = `
<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
  <path d="M12 13.698L6.64 9.232a1 1 0 00-1.28 1.536l6 5a1 1 0 001.28 0l6-5a1 1 0 10-1.28-1.536z" fill="currentColor"></path>
</svg>
`;

export default ({width=28, height=28, color="orange"}) => {
  return (<SvgXml xml={iconXML} width={width} height={height} color={color} />);
}