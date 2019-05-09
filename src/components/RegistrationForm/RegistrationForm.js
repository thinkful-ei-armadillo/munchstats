import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Required, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import Loading from '../Loading/Loading';
import './RegistrationForm.css';

class RegistrationForm extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => { }
  };

  state = { error: null };

  static contextType = UserContext;

  firstInput = React.createRef();

  handleSubmit = ev => {
    ev.preventDefault();
    this.context.loadingTrue();
    const { name, username, password } = ev.target;
    AuthApiService.postUser({
      name: name.value,
      username: username.value,
      password: password.value,
    })
      .then(res => {
        // do nothing
      })
      .catch(res => {
        this.setState({ error: res.error });
        this.context.loadingFalse();
      })
      .then(() => {
        if(!this.state.error){
          AuthApiService.postLogin({
            username: username.value,
            password: password.value,
          })
            .then(res => {
              this.context.processLogin(res.authToken);
              this.context.loadingFalse();
            })
            .catch(res => {
              this.setState({ error: res.error});
              this.context.loadingFalse();
            });
        }
      });
  }

  lightTheme = () => {
    document.documentElement.setAttribute('theme', 'light');
  }

  darkTheme = () => {
    document.documentElement.setAttribute('theme', 'dark');
  }

  render() {
    if(this.context.loading){
      return <div className="center"><Loading /></div>;
    }
    else {
      const { error } = this.state;
      return (
        <form
          className="RegistrationForm"
          onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <div>
            <Label htmlFor='registration-name-input'>
            Name<Required />
            </Label>
            <br />
            <Input
              ref={this.firstInput}
              id='registration-name-input'
              name='name'
              required
            />
          </div>
          <br />
          <div>
            <Label htmlFor='registration-username-input'>
            Choose a Username<Required />
            </Label>
            <br />
            <Input
              id='registration-username-input'
              name='username'
              required
            />
          </div>
          <br />
          <div>
            <Label htmlFor='registration-password-input'>
            Choose a Password<Required />
            </Label>
            <br />
            <Input
              id='registration-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <br />
          <Button type='submit'>
          Sign Up
          </Button>
          <footer>
            <p>Already have an account? <Link to='/login' style={{textDecoration: 'underline'}}>Log In!</Link></p>
            <p>Want to test out the app before registering? <Link to='/' onClick={this.handleTestLoginClick} style={{textDecoration: 'underline'}}>Log in as a test user.</Link></p>
            <p>Want to learn more about Munch Stats? Check out the <Link to='/about' style={{textDecoration: 'underline'}}>About Me</Link> page!</p>
          </footer>
        </form>
      );
    }
  }
}

export default RegistrationForm;