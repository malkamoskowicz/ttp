import React from 'react';
import {withRouter, Route, Switch} from 'react-router-dom';
import {Login, Signup, Transactions, Portfolio} from '.';

const Routes = () =>  {

    return (
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/transactions" component={Transactions} />
        <Route exact path="/portfolio" component={Portfolio} />
        <Route component={Login} />
      </Switch>
    )
}

export default withRouter(Routes)
