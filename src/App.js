import {
  Font
} from 'expo';
import React, {
  Component
} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';
import {
  Provider
} from 'react-redux';
import SignIn from './containers/SignIn'
import storeService from './services/store';

const store = storeService.getStore();

class Root extends Component {
  state = {
    fontsLoaded: false
  }

  componentDidMount() {
    Font.loadAsync({ 'roboto-medium': require('./assets/fonts/Roboto-Medium.ttf') })
      .then(() => this.setState({ fontsLoaded: true }));
  }

  render() {
    return (
      <Provider store={store}>
        {this.state.fontsLoaded ?
          <SignIn /> :
          <View />}
      </Provider>
    );
  }
}

export default Root;
