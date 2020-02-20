import React from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

const Navbar = props => (
      <nav>
        {!props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links after you log in */}
              <Link to="/transactions">transactions</Link>
              <Link to="/portfolio">Portflio</Link>
          </div>
        )}
      </nav>
)

const mapStateToProps = state => {
  return {
    isLoggedIn: state.loggedIn
  }
}

export default connect(mapStateToProps, null)(Navbar)