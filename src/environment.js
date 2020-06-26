import { Environment, Network, RecordSource, Store } from 'relay-runtime';


export default () => {
  const __config = {
    "queryURI": "http://soul.lcl/query",
  };
  
  function fetchQuery(
    operation,
    variables,
  ) {
    const headers = {
        'Content-Type': 'application/json',
    }

    const accessToken = null;
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
