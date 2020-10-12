import React from 'react';
import { SvgXml } from 'react-native-svg';


const iconXML = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg
    fill="none"
    height="28"
    width="28"
    viewBox="0 0 28 28"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="m14 2c6.6274 0 12 5.37258 12 12 0 6.6274-5.3726 12-12 12-6.62742 0-12-5.3726-12-12 0-6.62742 5.37258-12 12-12zm0 2c-5.52285 0-10 4.47715-10 10 0 5.5228 4.47715 10 10 10 5.5228 0 10-4.4772 10-10 0-5.52285-4.4772-10-10-10zm0 4c.5523 0 1 .44772 1 1v4h4c.5523 0 1 .4477 1 1s-.4477 1-1 1h-4v4c0 .5523-.4477 1-1 1s-1-.4477-1-1v-4h-4c-.55228 0-1-.4477-1-1s.44772-1 1-1h4v-4c0-.55228.4477-1 1-1z" fill="currentColor"/>
  </svg>
`;

export default ({width=28, height=28, color="orange"}) => {
  return (<SvgXml xml={iconXML} width={width} height={height} color={color} />);
}