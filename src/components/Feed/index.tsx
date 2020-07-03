import React, { useContext } from 'react';
import { Text } from 'react-native';
import { ReactRelayContext, fetchQuery, commitLocalUpdate } from 'react-relay';

import QueryRenderer from '../../helpers/QueryRenderer';
import StoryList from '../StoryList';

import * as feedQuery from './feedQuery';


export default ({ type, ownerKind=null, ownerID=null, limit, rubricID=null }) => {
  const { environment } = useContext(ReactRelayContext);

  let variables;
  let query;
  if (type === "owner") {
    variables = { ownerKind, ownerID, limit };
    query = feedQuery.get;
  } else if (type === "my") {
    variables = { limit };
    query = feedQuery.my;
  } else if (type === "voted") {
    variables = { limit };
    query = feedQuery.voted;
  } else if (type === "rubric") {
    variables = { limit, rubricID };
    query = feedQuery.rubric;
  }

  const _loadMore = (cursor, limit, onComplete) => {
    if (cursor === null) {
      console.error("Cursor is null. How you want to fetch data?");
      onComplete();
      return
    }
    fetchQuery(environment, feedQuery.next, { limit, cursor }).then((data) => {
      commitLocalUpdate(environment, store => {
        let appendNodeType;
        if (type === 'my' || type === 'voted' || type === 'rubric') {
          appendNodeType = type;
        } else {
          appendNodeType = 'get';
        }
        const feed = store.getRoot().getLinkedRecord('feed');
        const connection = feed.getLinkedRecord(
          appendNodeType,
          variables,
        );
        if(!connection) {
          console.error("ERROR. Cant find connection node in feed. Check baseFeedKey");
          onComplete();
          return
        }
        const nextConnection = feed.getLinkedRecord('next', {cursor, limit})
        const nextConnectionCursor = nextConnection.getValue('cursor');

        connection.setValue(nextConnectionCursor, 'cursor');
        connection.setLinkedRecords([
          ...connection.getLinkedRecords('edges'),
          ...nextConnection.getLinkedRecords('edges')
        ], 'edges');

        onComplete();
      });
    });
  }


  return (<QueryRenderer
    query={query}
    variables={variables}
    render={({error, props, retry}) => {
      if (error) {
        console.error(error)
        return (<Text>error!</Text>);
      }

      if (!props) {
        return (<Text>loading</Text>);
      }

      const cursor = props.feed.connection.cursor;

      // console.log('props', props);
      return (<StoryList
        list={props.feed.connection.edges}
        onRefresh={retry}
        onEndReached={() => {
          if (cursor === null) { return }
          _loadMore(cursor, limit, () => { console.log('loading complete') })
        }}
      />)
    }}
  />);
}

