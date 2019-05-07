import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';

export default class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
  };

  renderLogoutLink() {
    return (
      <div>
        <Link
          to='/profile'
          style={{textDecoration: 'none'}}>
          {this.context.user.name}
        </Link>
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
  }

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
  }

  render() {
    return (
      <header className="backgroundColor2 textColor2">
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
  }
}

