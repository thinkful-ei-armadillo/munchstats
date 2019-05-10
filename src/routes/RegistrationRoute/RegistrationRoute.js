import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import UserContext from '../../contexts/UserContext';

class RegistrationRoute extends Component {
  static defaultProps = {
    history: {
      push: () => {}
    }
  };

  static contextType = UserContext;

  handleRegistrationSuccess = () => {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    return (
      <section className='registrationPage'>
        <h1>Munch Stats</h1>
        <p id = 'tagline'>
          Create Meals, Eat Them, Stay Healthy        
        </p>
        <h2>Sign Up</h2>
        <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />
      </section>
    );
  }
}

export default RegistrationRoute;