/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import IndexPage from "./app/IndexPage"
export default class bookTogether extends Component {
   render() {
    return (
     <IndexPage />
    );
  }
}



AppRegistry.registerComponent('bookTogether', () => bookTogether);
