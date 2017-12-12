import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View
} from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {this.state.userGivenName ?
          <Text>Welcome, {this.state.userGivenName}</Text> :
          <Text>You should sign in below</Text>}
        <Button
          color="#841584"
          onPress={() => {
            Expo.Google
              .logInAsync({
                behavior: 'web',
                scopes: ['profile', 'email'],
                iosClientId: '539472494634-bkgsik5e24jq897p7k03ecal1u4dortu.apps.googleusercontent.com'
              })
              .then((res) => {
                console.log('success', res);
                this.setState({ userGivenName: res.user.givenName });
              })
              .catch((err) => {
                console.error('err', err);
              });
          }}
          title="Sign in with Google"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
