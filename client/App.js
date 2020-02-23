import React from 'react'
import {Navbar} from './components'
import {Routes} from './components'
import {connect} from 'react-redux'
import {checkLogin} from './reducers'

class App extends React.Component {
  constructor() {
    super()
    this.componentDidMount = this.componentDidMount.bind(this)
  }

  componentDidMount() {
    this.props.checkLogin()
  }

  render() {
    return (
      <div>
        <Navbar />
        <Routes />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export default connect(null, mapDispatchToProps)(App)