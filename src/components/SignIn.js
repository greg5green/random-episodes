import React, {
  Component
} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';
import GoogleSignInButton from './GoogleSignInButton';

const styles = StyleSheet.create({
});

class SignIn extends Component {
  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <Text>Random</Text>
        <Text>Episodes!</Text>
        <GoogleSignInButton onPress={this.props.actions.user.signInWithGoogle} />
      </View>
    );
  }
}

export default SignIn;
