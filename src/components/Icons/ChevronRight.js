import React from 'react';
import { SvgXml } from 'react-native-svg';


const iconXML = `
<?xml version="1.0" encoding="UTF-8"?>
<svg
  xmlns="http://www.w3.org/2000/svg"
  viewBox="0 0 28 28"
>
  <g fill="none" fill-rule="evenodd">
    <path d="M0 0h28v28H0z"></path><path d="M11 7.5l6.5 6.5-6.5 6.5" stroke="#8BC1FF" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
    <path d="M16.086 14l-5.793 5.793a1 1 0 001.414 1.414l6.5-6.5a1 1 0 000-1.414l-6.5-6.5a1 1 0 00-1.414 1.414L16.086 14z" fill="currentColor" fill-rule="nonzero"></path>
  </g>
</svg>
`;

export default ({width=28, height=28, color="orange"}) => {
  return (<SvgXml xml={iconXML} width={width} height={height} color={color} />);
}