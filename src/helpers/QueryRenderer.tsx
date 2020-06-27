import React, { useContext } from 'react';
import { ReactRelayContext, QueryRenderer } from 'react-relay';


export default (props: any) => {
  const { environment } = useContext(ReactRelayContext);
  return (<QueryRenderer
    environment={environment}
    {...props}
  />)
}