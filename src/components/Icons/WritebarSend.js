import React from 'react';
import { SvgXml } from 'react-native-svg';


const iconXML = `
  <?xml version="1.0" encoding="UTF-8"?>
  <svg
    fill="none"
    height="48"
    viewBox="0 0 48 48"
    width="48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="m24 7c9.3888 0 17 7.6112 17 17s-7.6112 17-17 17-17-7.6112-17-17 7.6112-17 17-17zm0 10-.0184.0002c-.0236.0004-.0473.0017-.0709.0038l.0893-.004c-.0506 0-.1004.0038-.149.011-.017.0026-.0344.0057-.0517.0092-.022.0044-.0437.0096-.0651.0155-.0157.0044-.0311.009-.0463.014-.0197.0064-.0395.0136-.059.0214-.0177.0071-.035.0146-.0521.0226-.0207.0097-.0411.0201-.0611.0312-.0121.0066-.0243.0137-.0364.0211-.0256.0157-.0504.0325-.0745.0503-.0074.0055-.0146.011-.0218.0166l-.0084.0068-.0817.0732-5.5 5.5c-.3905.3905-.3905 1.0237 0 1.4142s1.0237.3905 1.4142 0l3.7929-3.7931v10.086c0 .5523.4477 1 1 1s1-.4477 1-1v-10.086l3.7929 3.7931c.3905.3905 1.0237.3905 1.4142 0s.3905-1.0237 0-1.4142l-5.5-5.5-.0817-.0732c-.0028-.0023-.0057-.0046-.0086-.0069l.0903.0801c-.0354-.0354-.0728-.0676-.1118-.0966-.0242-.0178-.049-.0346-.0746-.0502-.0121-.0075-.0243-.0146-.0366-.0214-.0198-.0109-.0402-.0213-.061-.031-.017-.008-.0343-.0155-.0518-.0225-.0197-.0079-.0395-.0151-.0596-.0217-.0148-.0048-.0302-.0094-.0457-.0137-.0216-.006-.0433-.0112-.0652-.0156-.0174-.0035-.0349-.0066-.0523-.0092-.0191-.0029-.0388-.0053-.0587-.007-.0238-.0021-.0471-.0034-.0704-.0038-.0065-.0001-.0129-.0002-.0194-.0002z"
      fill="currentColor"
    />
  </svg>
`;

export default ({width=28, height=28, color="orange"}) => {
  return (<SvgXml xml={iconXML} width={width} height={height} color={color} />);
}