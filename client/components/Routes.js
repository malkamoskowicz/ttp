import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, Transactions, Portfolio} from '.'
import {connect} from 'react-redux'

const Routes = props =>  {
    if (props.isLoggedIn === 'yes') {
      return (
        <Switch>
          <Route path="/transactions" component={Transactions} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route component={Portfolio} />
        </Switch>
      )
    }
    if (props.isLoggedIn === 'no') {
      return (
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route component={Login} />
        </Switch>
      ) 
    }
    else return (
      <Switch>
      </Switch>
    )
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(Routes))