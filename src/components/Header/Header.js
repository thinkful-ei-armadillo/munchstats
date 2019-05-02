import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TokenService from '../../services/token-service';
import UserContext from '../../contexts/UserContext';
import { withRouter } from 'react-router';
import './Header.css';

class Header extends Component {
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

  handleGoBackClicked = () => {
    this.props.history.goBack();
  }

  render() {

    let backArrow = <section className='goBack'>
      <span onClick={() => this.handleGoBackClicked()} className='back_button'><i className="fas fa-chevron-left"></i></span>
    </section>;

    return (<>
      {(this.props.location.pathname !== '/')
        && (this.props.location.pathname !== '/reports')
        && (this.props.location.pathname !== '/login') 
        && (this.props.location.pathname !== '/register') 
        && backArrow}
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
    </>
    );
  }
}

export default withRouter(Header);