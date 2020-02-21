import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

const styles = {
  nav: {
    display: "flex",
    justifyContent: "flex-end"
  },
  link: {
    color: "black",
    padding: "20px",
    textDecoration: "none"
  }
}

const Navbar = props => (
      <nav style={styles.nav}>
        {!props.isLoggedIn ? (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link style={styles.link} to="/login">Login</Link>
            <Link style={styles.link} to="/signup">Signup</Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links after you log in */}
              <Link style={styles.link} to="/transactions">transactions</Link>
              <Link style={styles.link} to="/portfolio">Portflio</Link>
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