import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import * as SecureStore from 'expo-secure-store';


export default () => {
  const __config = {
    // "queryURI": "https://soul.ua/graphql",   // production
    "queryURI": "https://soul.ua/query",   // development
  };
  
  async function fetchQuery(
    operation,
    variables,
  ) {
    const headers = {
        'Content-Type': 'application/json',
    }

    let accessToken = null;
    try {
      accessToken = await SecureStore.getItemAsync("accessToken");
    } catch (error) {
      console.error(error)
    }
    
    if (accessToken) {
      headers['AccessToken'] = accessToken;
    }
    
    const body = {
      variables,
    };

    if (operation.id !== null) {
      body['queryId'] = operation.id;
    } else if (operation.text !== null) {
      body['query'] = operation.text;
    } else {
      alert('somthing went wrong with graphql configuration. App will not work properly')
    }

    return fetch(__config.queryURI, {
      method: 'POST',
      mode: 'cors',
      headers,
      body: JSON.stringify(body),
    }).then(response => {
      return response.json();
    }).catch((reason) => {
      console.error(reason);
      return {error: reason}
    });
  }

  return new Environment({
    handlerProvider: null,
    network: Network.create(fetchQuery),
    store: new Store(new RecordSource(typeof __records === 'undefined' ? {} : window.__records)),
  });
};
