import React, { useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styled from 'styled-components';
import i18n from 'i18n-js';

import SafeAreaView from '../../components/SafeAreaView';
import DismissIcon from '../../components/Icons/Dismiss';
import SendIcon from '../../components/Icons/WritebarSend';
import Footer from './Footer';


export default () => {
  const navigation = useNavigation();
  const [ attachedAssets, setAttachedAssets ] = useState([]);

  const title = "title user/community";

  return (
    <SafeAreaStyled><KeyboardAvoidingStyled
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Header>
        <HeaderBtn
          onPress={() => navigation.goBack()}
        ><DismissIcon width={32} height={32} /></HeaderBtn>
        <TitleContainer>
          <Title>{title}</Title>
        </TitleContainer>
        <HeaderBtn
        ><SendIcon width={32} height={32} /></HeaderBtn>
      </Header>

      <Body>
        <TextInputStyled
          placeholder={i18n.t("createStoryModal.textInputPlaceholder")}
          placeholderTextColor="#ccc"
          multiline
          scrollEnabled={false}
        />
      </Body>

      <Footer
        setAttachedAssets={(newAttachedAssets) => { setAttachedAssets([...attachedAssets, ...newAttachedAssets]) }}
      />
    </KeyboardAvoidingStyled></SafeAreaStyled>
  );
}

const SafeAreaStyled = styled(SafeAreaView)`
  flex: 1;
`;

const KeyboardAvoidingStyled = styled.KeyboardAvoidingView`
  flex: 1;
`;

const Header = styled.View`
  flex-direction: row;
`;

const HeaderBtn = styled.TouchableOpacity`
  margin: 10px;
`;

const TitleContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;

const Body = styled.ScrollView`
  flex: 1;
`;

const TextInputStyled = styled.TextInput`
  flex: 1;
  font-size: 20px;
  color: ${({theme}) => theme.colors.text};
  padding: 6px;
`;

