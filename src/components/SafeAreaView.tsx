import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from 'react-native';


export default (props) => {
  const {
    styles,
    ...restProps
  } = props;

  return (<SafeAreaView
    styles={[droidStyles, styles]}
    {...restProps}
  />);
}

const droidStyles = StyleSheet.create({
  // paddingTop: StatusBar.currentHeight,
});
