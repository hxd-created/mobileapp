import React, { useState } from 'react';
import styled from 'styled-components';

import AddCircleIcon from '../../../components/Icons/AddCircleIcon';


export default () => {
  return (<DialogInteractionSection>
    <AttachmentButton>
      <AddCircleIcon color="rgba(255,255,255, 0.5)"/>
    </AttachmentButton>
    <MessageBox
      multiline={true}
    />
  </DialogInteractionSection>);
}

const DialogInteractionSection = styled.View`
  flex-direction: row;
`;

const AttachmentButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
  padding-left: 10px;
  padding-bottom: 10px;
`;

const MessageBox = styled.TextInput`
  flex: 1;
  max-height: 120px;

  margin-top: 8px;
  margin-bottom: 8px;
  margin-left: 10px;

  border-radius: 20px;
  padding-left: 10px;
  padding-top: 5px;
  padding-bottom: 5px;
  border-color: ${({theme}) => theme.colors.border};
  border-width: 1px;
  color: ${({theme}) => theme.colors.text};
`;