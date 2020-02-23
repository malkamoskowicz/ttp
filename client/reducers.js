import axios from 'axios'

const LOGIN_USER = 'LOGIN'
const BUY_STOCK = 'BUY_STOCK'
const GET_TRANSACTIONS = 'GET_TRANSACTIONS'
const GET_PORTFOLIO = 'GET_PORTFOLIO'
const LOGOUT_USER = 'LOGOUT_USER'

const loginUser = userInfo => ({type: LOGIN_USER, userInfo})
const logoutUser = () => ({type: LOGOUT_USER})
const buyStock = stockInfo => ({type: BUY_STOCK, stockInfo})
const getTransactions = transactions => ({type: GET_TRANSACTIONS, transactions})
const getPortfolio = portfolio => ({type: GET_PORTFOLIO, portfolio})

const defaultState = {
    loggedIn: false,
    cashBalance: 0,
    transactions: [],
    portfolio: [],
}

export const login = () => async dispatch => {
  try {

    // login 
    const res = await axios.get('/auth/me')
    dispatch(loginUser(res.data))

    // grab user data and set to store
    let portfolio = await axios.get('/api/portfolio')
    dispatch(getPortfolio(portfolio.data))
    
    let transactions = await axios.get('/api/transactions')
    dispatch(getTransactions(transactions.data))

  } catch (err) {
    console.error(err)
  }
}

// buy stock thunk
export const buy = (stockInfo) => async dispatch => {
  try {

    // buy stock
    await axios.patch('/api/buy', stockInfo)
    dispatch(buyStock(stockInfo))

    // re-calculate portfolio
    const portfolio = await axios.get('/api/portfolio')
    dispatch(getPortfolio(portfolio.data))

    // re-calculate transactions
    const transactions = await axios.get('/api/transactions')
    dispatch(getTransactions(transactions.data))

  } catch (err) {
    console.error(err)
  }
}

// check to see if there is an active cookie session, if so use it to log user in
export const checkLogin = () => async dispatch => {
  try {
    const {data} = await axios.get('/auth/me')
    if (!data.error) dispatch(login())
    else dispatch(logoutUser())
  } catch (err) {
    console.error(err)
  }
}

export default function(state = defaultState, action) {
  switch (action.type) {
    case LOGIN_USER:
      return {loggedIn: 'yes', cashBalance: action.userInfo.cashBalance}
    case LOGOUT_USER:
      return {loggedIn: 'no', cashBalance: 0}
    case BUY_STOCK:
      return {
        ...state, 
        cashBalance: state.cashBalance - action.stockInfo.totalPrice,
        transactions: [...state.transactions, action.stockInfo],
    }
    case GET_TRANSACTIONS: 
      return {...state, transactions: action.transactions}
    case GET_PORTFOLIO:
      return {...state, portfolio: action.portfolio}
    default:
      return state
  }
}