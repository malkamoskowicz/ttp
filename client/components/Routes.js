import React from 'react'
import {withRouter, Route, Switch} from 'react-router-dom'
import {Login, Signup, Transactions, Portfolio} from '.'
import {connect} from 'react-redux'

const Routes = props =>  {
    if (props.isLoggedIn) {
      return (
        <Switch>
          <Route path="/transactions" component={Transactions} />
          <Route exact path="/portfolio" component={Portfolio} />
          <Route component={Portfolio} />
        </Switch>
      )
    }
    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route component={Login} />
      </Switch>
    ) 
}

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loggedIn
  }
}

export default withRouter(connect(mapStateToProps, null)(Routes))