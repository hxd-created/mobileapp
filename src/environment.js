import { Environment, Network, RecordSource, Store } from 'relay-runtime';
import * as SecureStore from 'expo-secure-store';


export default () => {
  const __config = {
    "queryURI": "http://soul.lcl/query",
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

    // in future production setup should use queryID instead of raw query passing
    body['query'] = operation.text;

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
