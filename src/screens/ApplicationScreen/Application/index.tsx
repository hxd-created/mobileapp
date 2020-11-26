import React, { useContext } from 'react';
import styled from 'styled-components/native';
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';
import { useDarkMode } from 'react-native-dynamic'

import UserContext from '../../../context/user';
import Loading from './Loading';
import Application from './Application';


const __query = graphql`
  query ApplicationRunQuery($appID: ID!, $appStringID: String!, $theme: String!, $platform: String!) {
    apps{
      run(appID: $appStringID, theme: $theme, platform: $platform){
        uri
      }
      get(appID: $appID) {
        title
        icon {
          id
          previewURL
        }
      }
    }
  }
`;

export default ({appID, params = {}, onClose}) => {
  const { environment } = useContext(ReactRelayContext);
  const { user } = useContext(UserContext);
  const isDark = useDarkMode();
  const themeName = isDark ? 'dark' : 'light';

  const variables = {
    appID,
    appStringID: appID,
    theme: themeName,
    platform: "mobile",
  };

  return (<QueryRenderer
    environment={environment}
    query={__query}
    variables={variables}
    render={({props, error, retry}) => {
      if(!props || error) {
        return (<Loading
          isLoading={!props}
          hasError={!!error}
          retry={retry}
        />);
      }
      return (<Application
        appID={appID}
        params={params}
        run={props.apps.run}
        app={props.apps.get}
        user={user}
        environment={environment}
        theme={themeName}
        onClose={onClose}
      />);
    }}
  />);
}
