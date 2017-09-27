import {
  USERNAME_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL
} from './actions';

const INITIAL_STATE = {
  username: '',
  password: '',
  error: '',
  loading: false,
  succesful: false
};

export default (state = INITIAL_STATE , action) => {
  console.log(action);
  switch (action.type) {
  case 'persist/REHYDRATE':
    return { ...state, INITIAL_STATE };
  case USERNAME_CHANGED:
    return { ...state, error: '', succesful: false, username: action.payload };
  case PASSWORD_CHANGED:
    return { ...state, error: '', succesful: false, password: action.payload };
  case LOGIN_USER:
    return { ...state, error: '', succesful: false, loading: true };
  case LOGIN_USER_SUCCESS:
    return { ...state, error: '', succesful: true ,loading: false };
  case LOGIN_USER_FAIL:
    return { ...state, error: 'Authentication Failed.', succesful: false, loading: false, password: ''};
  }
  return state;
}
