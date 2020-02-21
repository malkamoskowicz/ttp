import axios from 'axios';

const LOGIN_USER = 'LOGIN'
const BUY_STOCK = 'BUY_STOCK'

const loginUser = userInfo => ({type: LOGIN_USER, userInfo})
const buyStock = stockInfo => ({type: BUY_STOCK, stockInfo})

const defaultState = {
    loggedIn: false,
    cashBalance: 0
}

export const login = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me');
    dispatch(loginUser(res.data));
  } catch (err) {
    console.error(err);
  }
}

export const buy = (stockInfo) => async dispatch => {
  try {
    await axios.patch('/api/buy', stockInfo);
    dispatch(buyStock(stockInfo));
  } catch (err) {
    console.error(err);
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {loggedIn: true, cashBalance: action.userInfo.cashBalance}
    case BUY_STOCK:
        return {...state, cashBalance: state.cashBalance - action.stockInfo.totalPrice}
    default:
      return state;
  }
}