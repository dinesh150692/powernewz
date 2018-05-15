import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator
} from 'react-native';

export default class Loader extends Component {
  render() {
    return (
        <View style={[styles.spinnerContainer, styles.horizontal]}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>
    );
  }
}

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
});
