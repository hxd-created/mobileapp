import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Story from '../Story';


export default ({list, refreshing=false, onRefresh=null, onEndReached=null}) => {
  return (<Container>
    <FlatList
      data={list}
      style={{flexGrow: 0}}
      renderItem={ ({item}) => (<>
        <EmptySpace />
        <Story story={item} />
      </>)}
      keyExtractor={ story => story.id }
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReachedThreshold={0.6}
      numColumns={1}
    />
  </Container>);
};

const Container = styled.View`
  flex: 1;
`;

const EmptySpace = styled.View`
  height: 10px;
`;
