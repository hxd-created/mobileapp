import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';


export default (props) => {
  const {
    styles,
    ...restProps
  } = props;

  const Component = Platform.OS === "android" ? View : SafeAreaView;

  return (<Component
    styles={[droidStyles, styles]}
    {...restProps}
  />);
}

const droidStyles = StyleSheet.create({
  paddingTop: StatusBar.currentHeight,
});
