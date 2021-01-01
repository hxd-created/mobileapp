import React, { useContext, useState } from 'react';
import { Text } from 'react-native';
import { ReactRelayContext, fetchQuery, commitLocalUpdate } from 'react-relay';

import QueryRenderer from '../../helpers/QueryRenderer';
import queryRenderWrapper from '../queryRenderWrapper';
import StoryList from '../StoryList';

import * as feedQuery from './feedQuery';


interface InputProps {
  type: "owner" | "my" | "voted" | "rubric"
  ownerKind: "COMMUNITY" | "USER" | null
  ownerID: string | null
  limit: number
  rubricID: number | null
}

export default ({ type, ownerKind=null, ownerID=null, limit, rubricID=null }: InputProps) => {
  const { environment } = useContext(ReactRelayContext);
  const [ isRefreshing, setRefreshing ] = useState(false);

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
    render={queryRenderWrapper((props, retry) => {
      const cursor = props.feed.connection.cursor;

      return (<StoryList
        list={props.feed.connection.edges}
        onRefresh={retry}
        refreshing={isRefreshing}
        onEndReached={() => {
          if (cursor === null) return;
          if (isRefreshing) return;

          setRefreshing(true);
          _loadMore(cursor, limit, () => { 
            setRefreshing(false);
          });
        }}
      />);
    })}
  />);
}


