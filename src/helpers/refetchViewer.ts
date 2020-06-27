import { fetchQuery, graphql } from 'relay-runtime';


export default async (environment) => {
  return fetchQuery(environment, graphql`
    query refetchViewerQuery {
      passport {
        viewer {
          id
          realID
          firstname
          lastname
        }
      }
    }
  `);
}