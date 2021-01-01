import React from 'react';

import LoadingView from './LoadingView';
import ErrorView from './ErrorView';


export default (render) => {
  return ({props, error, retry}) => {
    if (error) {
      return (<ErrorView error={error} retry={retry} />);
    }
    if (!props) {
      return (<LoadingView />);
    }
  
    return render(props, retry);
  }
}