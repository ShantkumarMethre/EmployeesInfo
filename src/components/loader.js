import React from 'react';
import {StyleSheet, ActivityIndicator, View, Modal, Text} from 'react-native';
import {connect} from 'react-redux';

const Loader = props => {
  return <View style={{flex: 1}}>{props.children}</View>;
};

styles = StyleSheet.create({
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D9D7D7',
    opacity: 0.7,
  },
});

const mapStateToProps = state => {
  console.log('state value', state);
  return {
    commonState: state.common,
  };
};

export default connect(
  mapStateToProps,
  {},
)(Loader);
