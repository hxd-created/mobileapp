import React, { useState } from 'react';
import styled, { css } from 'styled-components/native';
import Constants from 'expo-constants';
import { WebView } from 'react-native-webview';
import * as WebBrowser from 'expo-web-browser';

import CancelIcon from '../../../components/Icons/Cancel';
import ElipsisIcon from '../../../components/Icons/Elipsis';

import Loading from './Loading';


class Application extends React.Component {
  state = {
    isInited: false,
  }
  webref = null;

  apiInit({request_id}) {
    this.setState({...this.state, isInited: true});
    this.sendToFrame('SoulAppInitResponse', {}, request_id);
  }

  apiGetCurrentTheme({request_id}) {
    this.sendToFrame('SoulGetCurrentThemeResponse', {theme: this.props.theme}, request_id);
  }

  apiOpenStoryPopUp(data) {
    console.log('apiOpenStoryPopUp', data)
  }

  apiGetParams(data) {
    console.log('apiGetParams', data)
  }

  apiSetParams(data) {
    console.log('apiSetParams', data)
  }

  apiOpenApp(data) {
    console.log('apiOpenApp', data)
  }

  apiGetCurrentGeoposition(data) {
    console.log('apiGetCurrentGeoposition', data)
  }

  apiGetUserByID(data) {
    console.log('apiGetUserByID', data)
  }

  apiUploadPhoto(data) {
    console.log('apiUploadPhoto', data)
  }

  async apiOpenWebsite({request_id, params: { uri }}) {
    console.log('apiOpenWebsite')
    await WebBrowser.openBrowserAsync(uri);
    console.log('webbrowser resolved');
    this.sendToFrame('SoulOpenWebsiteResponse', {}, request_id);
  }

  apiInstallCommunity(data) {
    console.log('apiInstallCommunity', data)
  }

  apiGetCommunity(data) {
    console.log('apiGetCommunity', data)
  }


  handleMessage(msg) {
    let data;
    try {
      data = JSON.parse(msg)
    } catch (error) {
      console.log("ERROR while parsing message from app", error);
      return
    }

    switch (data.method) {
      case 'SoulAppInit':
        return this.apiInit(data);
      case 'SoulGetCurrentTheme':
        return this.apiGetCurrentTheme(data);
      case 'SoulOpenStoryPopUp':
        return this.apiOpenStoryPopUp(data);
      case 'SoulGetParams':
        return this.apiGetParams(data);
      case 'SoulSetParams':
        return this.apiSetParams(data);
      case 'SoulOpenApp':
        return this.apiOpenApp(data);
      case 'SoulGetCurrentGeoposition':
        return this.apiGetCurrentGeoposition(data);
      case 'SoulGetUserByID':
        return this.apiGetUserByID(data);
      case 'SoulUploadPhoto':
        return this.apiUploadPhoto(data);
      case 'SoulOpenWebsite':
        return this.apiOpenWebsite(data);
      case 'SoulInstallCommunity':
        return this.apiInstallCommunity(data);
      case 'SoulGetCommunity':
        return this.apiGetCommunity(data);
      default:
        console.log('Unknown message from app: ', e);
        break;
    }
  }

  sendToFrame(method, params, request_id=null) {
    if (!this.webref) return;
    
    const data = JSON.stringify(JSON.stringify({ method, params, request_id }));
    const jsCode = `window.dispatchEvent(new CustomEvent("message", {"detail": ${data}}))`;
    this.webref.injectJavaScript(jsCode);
  }

  render() {
    const uri = this.props.run.uri;
    return (<Container theme={this.props.theme}>
      <AppView
        visible={this.state.isInited}
        source={{ uri }}
        ref={(r) => (this.webref = r)}
        onMessage={(event) => {
          this.handleMessage(event.nativeEvent.data);
        }}
      />
      {!this.state.isInited && <LoadingContainer>
        <Loading
          isLoading={true}
          label={this.props.app && this.props.app.title}
          icon={this.props.app && this.props.app.icon}
        />
      </LoadingContainer>}
      <ApplicationControls>
        <AppActionContainer><ElipsisIcon width={20} height={20} color="white" /></AppActionContainer>
        <AppActionDelimetr />
        <AppActionContainer onPress={this.props.onClose}><CancelIcon width={20} height={20} color="white"  /></AppActionContainer>
      </ApplicationControls>
    </Container>);
  }
}


export default Application;

const Container = styled.SafeAreaView`
  flex: 1;
  padding-top: ${Constants.statusBarHeight}px;
  ${({theme}) => theme === 'dark' ? css`
    background-color: #19191a;
  ` : css`
    background-color: #fff;
  `}
`;

const AppView = styled(WebView)`
  flex: 1;
  opacity: ${({visible}) => visible ? 1 : 0};
`;

const LoadingContainer = styled.SafeAreaView`
  position: absolute;
  top: ${Constants.statusBarHeight}px;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ApplicationControls = styled.View`
  position: absolute;
  top: ${Constants.statusBarHeight + 15}px;
  right: 5px;
  background-color: rgba(0,0,0, 0.8);
  height: 28px;
  flex-direction: row;
  align-items: center;
  border-radius: 8px;
`;

const AppActionContainer = styled.TouchableOpacity`
  padding: 5px;
  padding-left: 9px;
  padding-right: 9px;
`;

const AppActionDelimetr = styled.View`
  width: 1px;
  height: 16px;
  margin-left: 2px;
  margin-right: 2px;
  background-color: #fff;
`;