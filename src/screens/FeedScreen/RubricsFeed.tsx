import React from 'react';
import { Button } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { graphql } from 'react-relay';
import styled from 'styled-components/native';

import QueryRenderer from '../../helpers/QueryRenderer';

import Feed from './Feed';


const Tab = createMaterialTopTabNavigator();

const RubricFeed = ({rubrics}) => {
  return (<Tab.Navigator tabBarOptions={{
    scrollEnabled: true,
    indicatorStyle: { backgroundColor: 'orange' },
    tabStyle: {
      width: 'auto',
    },
  }}>
    {rubrics.map(rubric => (<Tab.Screen
      key={rubric.id}
      name={`rubric-${rubric.id}`}
      options={{ tabBarLabel: rubric.titleUA }}
    >{() => <Feed type="rubric" rubricID={rubric.id} />}</Tab.Screen>))}
  </Tab.Navigator>);
}

const RetryWithError = ({retry, error}) => {
  return (<ErrorContainer>
    <Text>{error}</Text>
    <Button title="retry" onPress={retry} />
  </ErrorContainer>);
}

export default () => {
  return (<QueryRenderer
    query={graphql`
      query RubricsFeedQuery {
        rubricator {
          rubrics {
            id
            titleUA
          }
        }
      }
    `}
    render={({error, props, retry}) => {
      if (error) {
        return (<RetryWithError retry={retry} error={error} />);
      }
      if (!props) { return (<Text>loading</Text>)}
      return (<RubricFeed rubrics={props.rubricator.rubrics} />)
    }}
  />)
}

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Text = styled.Text`
  color: ${({theme}) => theme.colors.text};
`;