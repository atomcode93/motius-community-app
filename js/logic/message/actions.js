import axios from 'axios';

export const FETCH_MESSAGES = 'FETCH_MESSAGES';

export function fetchMessages(url) {
  return function(dispatch, getState){
    const request = axios.get(url);

    request.then(response => {
      dispatch({
        type: FETCH_MESSAGES,
        payload: response.data.messages
      });
    });
  };
}
