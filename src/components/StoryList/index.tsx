import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import Story from '../Story';


export default ({list, refreshing=false, onRefresh=null, onEndReached=null}) => {
  console.log('storyList', list.length)
  return (<Container>
    <FlatList
      data={list}
      renderItem={ ({item}) => <Story story={item} /> }
      keyExtractor={ story => story.id }
      onEndReached={onEndReached}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onEndReachedThreshold={0.75}
      numColumns={1}
    />
  </Container>);
};

const Container = styled.View`
  flex: 1;
`;
