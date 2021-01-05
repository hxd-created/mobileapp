import React, { useState } from 'react';
import { Modal, Alert, useWindowDimensions } from 'react-native';
import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';

import Galary from './Galary';


export default ({isShown, addAttachments, onClose}) => {
  const [ selectedSection, setSelectedSection ] = useState("galary");
  const [ sectionActionBtn, setSectionActionBtn ] = useState(null);

  const windowHeight = useWindowDimensions().height;

  const addGalaryAssets = (assets) => {
    addAttachments(assets);
    onClose();
    
  }

  return (<Modal
    animationType="slide"
    transparent={true}
    visible={isShown}
    onRequestClose={() => {
      Alert.alert("Modal has been closed.");
    }}
  ><ModalContainer>
    <Card windowHeight={windowHeight}>
      <Menu>
        <MenuItem onPress={() => setSelectedSection("galary")}>
          <MenuItemIconContainer selected={selectedSection === "galary"}></MenuItemIconContainer>
          <MenuItemLabel>Photo</MenuItemLabel>
        </MenuItem>
      </Menu>
      <Content>
        {selectedSection === "galary" && <Galary setActionBtn={setSectionActionBtn} onDone={addGalaryAssets}/>}
      </Content>
      <ActionContainer>
        {sectionActionBtn && <ActionBtn type="primary" onPress={sectionActionBtn.onPress}>
          <ActionLabel>
            {sectionActionBtn.titleKey === "add" && "Add"}
            {sectionActionBtn.counterLabel && `(${sectionActionBtn.counterLabel})`}
          </ActionLabel>
        </ActionBtn>}
        <ActionBtn onPress={() => { onClose() }}><ActionLabel>Cancel</ActionLabel></ActionBtn>
      </ActionContainer>
    </Card>
  </ModalContainer></Modal>);
}

const ModalContainer = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
  flex-direction: row;
  align-items: flex-end;
  justify-content: flex-end;
`;

const Card = styled.View`
  flex: 1;
  height: ${({windowHeight}) => Math.round(windowHeight * 0.65)}px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  ${({theme}) => css`
    background-color: ${theme.colors.card};
  `}
`;

const Menu = styled.View`
  flex-direction: row;
  padding: 10px;
`;

const MenuItem = styled.TouchableOpacity`
  flex-direction: column;
  align-items: center;
  padding: 3px;
`;

const MenuItemIconContainer = styled.View`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  margin-left: 6px;
  margin-right: 6px;
  margin-bottom: 4px;
  overflow: hidden;
  ${({selected, theme}) => selected && css`
    background-color: ${theme.colors.border};
  `}
`;

const MenuItemLabel = styled.Text`
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
`;

const Content = styled.ScrollView`
  flex: 1;
`;

const ActionContainer = styled.View`
  flex-direction: row;
  ${({theme}) => css`
    background-color: ${theme.colors.background};
  `}
`;

const ActionBtn = styled.TouchableOpacity`
  flex: 1;
  margin: 10px;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  ${({theme, type="secondary"}) => css`
    background-color: ${theme.colors.card};
  `}

  ${({type = "secondary"}) => css`
    ${type === "primary" && css`
      margin-right: 0;
    `}
  `}
`;

const ActionLabel = styled.Text`
  margin: 10px;
  font-weight: 700;
  font-size: 18px;
  ${({theme}) => css`
    color: ${theme.colors.text};
  `}
`;
