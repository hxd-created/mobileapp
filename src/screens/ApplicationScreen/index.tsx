import React, { useState, useEffect } from 'react';
import styled from 'styled-components/native';
import Application from './Application';


export default ({navigation, route: { params }}) => {
  const [ openedApps, setOpenedApps ] = useState([params]);

  useEffect(() => {
    console.log('apps changed', params);
    if (openedApps.length > 0 && params.appID === openedApps[0].appID) {
      return;
    }
    setOpenedApps([params, ...openedApps]);

    return () => {
      console.log('cleanup')
    }
  }, [params]);

  const onClose = (appID) => {
    // TODO: close app in stack and return to previous app
    navigation.goBack();
  }

  return (<Container>
    {openedApps.map(app => <Application key={app.appID} onClose={() => onClose(app.appID)} {...app} />)}
  </Container>);
}

const Container = styled.View`
  flex: 1;
`;
