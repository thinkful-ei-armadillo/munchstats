import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout()
  };

  renderLogoutLink() {
    return (
      <div>
        <span>
          {this.context.user.name}
        </span>
        <nav>
          <Link
            onClick={this.handleLogoutClick}
            to='/login'
            style={{textDecoration: 'none'}}>
            Logout
          </Link>
        </nav>
      </div>
    );
  };

  renderLoginLink() {
    return (
      <nav>
        <Link
          to='/login'
          style={{textDecoration: 'none'}}>
          Log In
        </Link>
        {' | '}
        <Link
          to='/register'
          style={{textDecoration: 'none'}}>
          Sign Up
        </Link>
      </nav>
    );
  };

  render() {
    return (
      <header>
        <h1>
          <Link
            to='/'
            style={{textDecoration: 'none'}}>
            Munch Stats
          </Link>
        </h1>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  };
};

export default Header;
