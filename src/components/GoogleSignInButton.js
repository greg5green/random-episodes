import React from 'react';
import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  View
} from 'react-native';

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4285f4',
    borderRadius: 2,
    height: 40,
    shadowColor: "#000",
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowOpacity: 0.24,
    shadowRadius: 1,
    width: 185
  },
  buttonContent: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  logoContainer: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 1,
    height: 38,
    justifyContent: 'center',
    margin: 1,
    width: 38
  },
  text: {
    color: '#fff',
    flex: 1,
    fontFamily: 'roboto-medium',
    fontSize: 14,
    textAlign: 'center'
  }
});

function GoogleSignInButton({ onPress }) {
  return (
    <TouchableHighlight
      onPress={onPress}
      style={styles.button}
      underlayColor="#3367d6"
    >
      <View style={styles.buttonContent}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/images/google-logo.png')} />
        </View>
        <Text style={styles.text}>Sign in with Google</Text>
      </View>
    </TouchableHighlight>
  )
}

export default GoogleSignInButton;
