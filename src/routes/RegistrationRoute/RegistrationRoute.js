import React, { Component } from 'react';
import RegistrationForm from '../../components/RegistrationForm/RegistrationForm';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import EventsApiService from '../../services/events-api-service';

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

  handleTestLoginClick = ev => {
    ev.preventDefault();
        this.context.loadingTrue();

        this.setState({ error: null });

        AuthApiService.postLogin({
        username: 'test',
        password: 'pass'
        })
        .then(res => {
            this.context.processLogin(res.authToken);
            this.props.history.push('/');
            this.context.loadingFalse();
            EventsApiService.getTodaysEvents()
            .then(res => this.context.setTodayEvents(res))
            .catch(e => this.context.setError(e));
        })
        .catch(res => {
            this.setState({ error: res.error });
            this.context.loadingFalse();
        });
  }

  render() {
    return (
      <section className='registrationPage'>
        <p id = 'tagline'>
          Create meals, eat them, stay healthy        
        </p>
        <h2>Sign up</h2>
        <RegistrationForm onRegistrationSuccess={this.handleRegistrationSuccess} />
      </section>
    );
  }
}

export default RegistrationRoute;