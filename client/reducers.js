import axios from 'axios';

const LOGIN_USER = 'LOGIN'
const loginUser = userInfo => ({type: LOGIN_USER, userInfo});

const defaultState = {
    loggedIn: false,
    cashBalance: 0
}

export const login = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    console.log('res', res)
    dispatch(loginUser(res.data));
  } catch (err) {
    console.error(err);
  }
};

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {loggedIn: true, cashBalance: action.userInfo.cashBalance}
    default:
      return state;
  }
}