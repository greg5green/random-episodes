import {
  Google
} from 'expo';
import actionTypes from '../constants/actionTypes';
import userService from '../services/user';

function signInWithGoogle() {
  return function(dispatch) {
    userService.signInWithGoogle()
      .then((userInfo) => {
        dispatch({
          type: actionTypes.GOOGLE_SIGN_IN_SUCCESS,
          payload: { userInfo }
        });
        console.log(userInfo);
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: actionTypes.GOOGLE_SIGN_IN_FAILURE,
          error: true,
          payload: error
        });
      });
  };
}

export {
  signInWithGoogle
};
