import axios from 'axios';
import { AsyncStorage } from 'react-native';

export const USERNAME_CHANGED = 'USERNAME_CHANGED';
export const PASSWORD_CHANGED = 'PASSWORD_CHANGED';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAIL = 'LOGIN_USER_FAIL';

export const usernameChanged = (text) => {
  return {
    type: USERNAME_CHANGED,
    payload: text
  };
}

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  }
}

export const login = ({ username, password }) => {
  return (dispatch) => {

    dispatch({
      type: LOGIN_USER
    });

    axios.post('https://www.motius.de/api/token-auth/', {
      username: username,
      password: password
    })
    .then(() => { loginUserSuccess(dispatch) })
    .catch(() => { loginUserFail(dispatch) });
  };
}

const loginUserSuccess = (dispatch) => {
  dispatch({
    type: LOGIN_USER_SUCCESS
  });
  AsyncStorage.setItem('loggedin', 'true');
}

const loginUserFail = (dispatch) => {
  dispatch({
    type: LOGIN_USER_FAIL
  });
}
