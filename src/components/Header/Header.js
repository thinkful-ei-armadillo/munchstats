import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import './Header.css';
import logo from '../../images/logo_m.png'

export default class Header extends Component {
  static contextType = UserContext;

  handleLogoutClick = () => {
    this.context.processLogout();
    document.documentElement.setAttribute('theme', 'light');
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
      <header className="backgroundColor2 textColor2 shadow">
        <Link
          to='/'
          style={{textDecoration: 'none'}}>
          <img src={logo} className='logoTest' alt="Munch Stats"/>
        </Link>
        {TokenService.hasAuthToken()
          ? this.renderLogoutLink()
          : this.renderLoginLink()}
      </header>
    );
  }
}