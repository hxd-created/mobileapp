import React, { useState, useContext } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  SafeAreaView,
  Keyboard,
  Platform,
  
  useWindowDimensions,
} from 'react-native';
import { ReactRelayContext } from 'react-relay';
import styled from 'styled-components/native';
import * as SecureStore from 'expo-secure-store';

import SigninMutation from '../mutations/Passport/SigninMutation';
import refetchViewer from '../helpers/refetchViewer';


export default () => {
  const { environment } = useContext(ReactRelayContext);
  const [ form, setForm ] = useState({
    login: "",
    password: "",
  });
  const [ isLoading, setLoading ] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const logoWidth = Math.round(windowWidth * 0.9);

  const handleSignin = async () => {
    const { login, password } = form;
    setLoading(true);
    SigninMutation(environment, login, password, async (response, errors) => {
      if (errors) {
        alert(errors[0].message);
        setLoading(false);
        return;
      }
      
      const accessToken = response.passportMutations.Signin.accessToken;
      await SecureStore.setItemAsync('accessToken', accessToken);

      await refetchViewer(environment);
    })
  }

  return (<KeyboardAvoidingView
    behavior={Platform.OS == "ios" ? "padding" : "height"}
    style={{flex: 1}}
    keyboardVerticalOffset={64}
  ><SafeAreaView style={{flex: 1, justifyContent: 'flex-end'}}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Logo source={require('../assets/logo-circle.png')} style={{width: logoWidth, height: logoWidth}} />
        <Form>
          <TextInput
            keyboardType="email-address"
            autoCapitalize="none"
            autoContentType="email"
            placeholder="Login/email"
            value={form.login}
            onChangeText={text => setForm({...form, login: text})}
            editable={!isLoading}
          />

          <TextInput
            secureTextEntry={true}
            placeholder="Password"
            autoContentType="password"
            value={form.password}
            onChangeText={text => setForm({...form, password: text})}
            editable={!isLoading}
          />

          <Submit
            title="Signin"
            onPress={handleSignin}
            disabled={isLoading}
          />
        </Form>
      </Container>
    </TouchableWithoutFeedback>
  </SafeAreaView></KeyboardAvoidingView>);
}

const Container = styled.View`
  flex: 1;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  background-color: #fff;
  margin-bottom: 20px;
`;

const Logo = styled.Image`
  resize-mode: contain;
  flex: 1;
  margin-top: 50px;
  margin-bottom: 40px;
`;

const Form = styled.View`
  flex: 1;
  width: 100%;
  align-items: center;
  margin-right: 20px;
  margin-left: 20px;
`;

const TextInput = styled.TextInput`
  width: 70%;
  padding: 10px;
  margin: 10px;
  background-color: #efefef;
  border-radius: 10px;
`;

const Submit = styled.Button`
`;