import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';


export default () => {
  const { environment } = useContext(ReactRelayContext);

  return (<QueryRenderer
    environment={environment}
    query={graphql`
      query GraphqlTestQuery {
        passport {
          viewer {
            id
          }
        }
      }
    `}

    render={({error, props}) => {
      if (error) {
        return (<Text>ERROR</Text>);
      }
      if (!props) {
        return (<Text>Loading</Text>);
      }

      const viewer = props.passport.viewer;

      return (<Text>{viewer ? viewer.id : "user not authenticated"}</Text>);
    }}
  />);
}
