import React, { Component } from 'react';
import Profile from '../../components/Profile/Profile';

class ProfileRoute extends Component {
  render() {
    return (
      <section className='profilePage'>
        <Profile history = {this.props.history} />
      </section>
    );
  }
}

export default ProfileRoute;