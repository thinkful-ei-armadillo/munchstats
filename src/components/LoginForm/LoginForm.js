import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';
import EventsApiService from '../../services/events-api-service';
import './LoginForm.css';

class LoginForm extends Component {
  static defaultProps = {
    onLoginSuccess: () => { }
  };

  static contextType = UserContext;

  state = { error: null };

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    this.context.loadingTrue();
    const { username, password } = ev.target;

    this.setState({ error: null });

    AuthApiService.postLogin({
      username: username.value,
      password: password.value
    })
      .then(res => {
        username.value = '';
        password.value = '';
        this.context.processLogin(res.authToken);
        this.props.onLoginSuccess();
        this.context.loadingFalse();
        EventsApiService.getTodaysEvents()
          .then(res => this.context.setTodayEvents(res))
          .catch(e => this.context.setError(e));
      })
      .catch(res => {
        this.setState({ error: res.error });
        this.context.loadingFalse();
      });
  };

  render() {

    if(this.context.loading){
      return <div className="center"><Loading /></div>;
    }
    else {
      const { error } = this.state;
      return (
        <div className="formContainer">
          <form
            className='inputForm'
            onSubmit={this.handleSubmit}>
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
            <div className='formField'>
              <Label htmlFor='login-username-input' className="inputLabel backgroundColor6 border3 textColor3">
                Username
              </Label>
              <Input
                ref={this.firstInput}
                id='login-username-input'
                name='username'
                className="inputField border3 backgroundColor4"
                required
              />
            </div>
            <div className='formField'>
              <Label htmlFor='login-password-input'  className="inputLabel backgroundColor6 border3 textColor3">
                Password
              </Label>
              <Input
                id='login-password-input'
                name='password'
                type='password'
                className="inputField border3 backgroundColor4"
                required
              />
            </div>
            <Button type='submit'>
              Log In
            </Button>
            <footer>
              <p>Don't have an account? <Link to='/register' style={{textDecoration: 'underline'}}>Sign Up!</Link></p>
            </footer>
          </form>
        </div>
      );
    }
  }
}

export default LoginForm;