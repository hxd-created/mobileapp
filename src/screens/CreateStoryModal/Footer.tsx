import React, { useState, useEffect } from 'react';
import { Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import styled, { css } from 'styled-components';

import ChevronDownIcon from '../../components/Icons/ChevronDown';
import AddCircleIcon from '../../components/Icons/AddCircleIcon';
import KeyboardIcon from '../../components/Icons/Keyboard';
import AttachmentsModal from '../../components/AttachmentsModal';


export default ({setAttachedAssets}) => {
  const [ isKeyboardShown, setKeyboardShown ] = useState(false);
  const [ isAttachmentsModalShown, setAttachmentsModalShown ] = useState(false);

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', _keyboardDidShow);
    Keyboard.addListener('keyboardDidHide', _keyboardDidHide);

    // cleanup function
    return () => {
      Keyboard.removeListener('keyboardDidShow', _keyboardDidShow);
      Keyboard.removeListener('keyboardDidHide', _keyboardDidHide);
    };
  }, []);

  const _keyboardDidShow = () => {
    setKeyboardShown(true);
  };

  const _keyboardDidHide = () => {
    setKeyboardShown(false);
  };

  const toggleKeyboard = () => {
    if (isKeyboardShown) {
      Keyboard.dismiss();
    } else {
      
    }
  }

  return (<>
    <Container>
      <LeftActions>
        <TouchableOpacity onPress={() => setAttachmentsModalShown(true)}>
          <AddCircleIcon />
        </TouchableOpacity>
      </LeftActions>
      <RightActions>
        <TouchableOpacity onPress={toggleKeyboard}>
          {isKeyboardShown ? <ChevronDownIcon /> : <KeyboardIcon />}
        </TouchableOpacity>
      </RightActions>
    </Container>

    <AttachmentsModal
      isShown={isAttachmentsModalShown}
      addAttachments={setAttachmentsModalShown}
      onClose={() => setAttachmentsModalShown(false)}
    />
  </>);
}

const Container = styled.View`
  padding: 4px;
  flex-direction: row;
  ${({theme}) => css`
    border-top-width: 1px;
    border-top-color: ${theme.colors.border};
  `}
`;

const LeftActions = styled.View`
  flex: 1;
`;

const RightActions = styled.View``;