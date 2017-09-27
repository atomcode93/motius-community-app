import axios from 'axios';

export const FETCH_USER = 'FETCH_USER';
export function fetchUser(userID) {
  return function(dispatch, getState){
    // TODO: Do not hardcode tokens this way. At best create a constants.js file with all the values
    const token = '179940535380-179891467378-179325583089-b9706fa95a79c48a51cf23f05981d3f6';
    const url = `https://slack.com/api/users.info?token=xoxp-${token}&user=${userID}&pretty=1`;
    const request = axios.get(url);

    request.then(response => {
      dispatch({
        type: FETCH_MEMBERS,
        payload: response.data.user
      });
    });
  };
}
