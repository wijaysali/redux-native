/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux'

import store from './app/store'
import Main from './app/index'
import Home from './app/components/home'

export default class App extends Component {
  render() {
    return (
        <Provider store={store}>
          <Main />
        </Provider>
    )
  }
}

