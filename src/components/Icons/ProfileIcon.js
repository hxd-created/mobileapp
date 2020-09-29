import React from 'react';
import { SvgXml } from 'react-native-svg';


const iconXML = `
<?xml version="1.0" encoding="UTF-8"?>
<svg width="28px" height="28px" viewBox="0 0 28 28" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <!-- Generator: Sketch 63.1 (92452) - https://sketch.com -->
    <title>profile_28</title>
    <desc>Created with Sketch.</desc>
    <g id="Other" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Component:-ModalPage" transform="translate(-1635.000000, -255.000000)">
            <g id="profile_28" transform="translate(1635.000000, 255.000000)">
                <polygon id="user_circle_outline_28" points="0 0 28 0 28 28 0 28"></polygon>
                <path d="M14,2 C20.627417,2 26,7.372583 26,14 C26,20.627417 20.627417,26 14,26 C7.372583,26 2,20.627417 2,14 C2,7.372583 7.372583,2 14,2 Z M14,20.5 C11.9140585,20.5 9.92003841,21.0819877 8.20321268,22.1490263 C9.83817315,23.3145604 11.8390401,24 14,24 C16.1605163,24 18.1610053,23.3148418 19.7960379,22.1499545 C18.0794784,21.0818382 16.0856823,20.5 14,20.5 Z M14,4 C8.4771525,4 4,8.4771525 4,14 C4,16.6156772 5.00425519,18.9967981 6.64822833,20.7788253 C8.78562177,19.3081977 11.3309834,18.5 14,18.5 C16.6692926,18.5 19.214928,19.3083599 21.3526704,20.7774111 C22.9961172,18.995915 24,16.6151922 24,14 C24,8.4771525 19.5228475,4 14,4 Z M14,7.5 C16.6241597,7.5 18.75,9.62584025 18.75,12.25 C18.75,14.8741597 16.6241597,17 14,17 C11.3758403,17 9.25,14.8741597 9.25,12.25 C9.25,9.62584025 11.3758403,7.5 14,7.5 Z M14,9.5 C12.4804097,9.5 11.25,10.7304097 11.25,12.25 C11.25,13.7695903 12.4804097,15 14,15 C15.5195903,15 16.75,13.7695903 16.75,12.25 C16.75,10.7304097 15.5195903,9.5 14,9.5 Z" fill="currentColor" fill-rule="nonzero"></path>
            </g>
        </g>
    </g>
</svg>
`;

export default ({width=28, height=28, color="orange"}) => {
  return (<SvgXml xml={iconXML} width={width} height={height} color={color} />);
}