import {
  Google
} from 'expo';
import apiService from './api';

const userService = {
  signInWithGoogle() {
    const googleOAuthConfig = {
      behavior: 'web',
      iosClientId: '539472494634-bkgsik5e24jq897p7k03ecal1u4dortu.apps.googleusercontent.com',
      scope: ['profile', 'email']
    };

    return Google.logInAsync(googleOAuthConfig)
      .then((res) => {
        if (res.type === 'success') {
          return apiService.put('/sign_in/google', { idToken: res.idToken + '' })
            .then((res) => {
              console.log(res);
              return res;
            });
        } else {
          throw new Error(res);
        }
      });
  }
};

export default userService;
