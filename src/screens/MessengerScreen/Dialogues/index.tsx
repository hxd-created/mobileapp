import React, { useContext } from 'react'
import { ReactRelayContext, QueryRenderer, graphql } from 'react-relay';
import ErrorView from '../../../components/ErrorView';
import LoadingView from '../../../components/LoadingView';
import Dialogues from './Dialogues';


const __query = graphql`
  query DialoguesQuery {
    messenger{
      dialogs{
        edges {
          ...Dialogues_dialogs
        }
      }
    }
  }
`;

export default () => {
  const { environment } = useContext(ReactRelayContext);
  return <QueryRenderer
    environment={environment}
    query={__query}
    fetchPolicy="store-and-network"
    render={({props, error, retry}) => {
      if (error) {
        return (<ErrorView error={error} retry={retry} />)
      }
      if (!props) {
        return <LoadingView />
      }
      return <Dialogues dialogs={props.messenger.dialogs.edges} />
    }}
  />
}