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
        <div className="formContainer">
          <form
            className="RegistrationForm"
            onSubmit={this.handleSubmit}>
            <div role='alert'>
              {error && <p>{error}</p>}
            </div>
            <div className='formField'>
              <Label htmlFor='registration-name-input' className="inputLabel backgroundColor6 border3 textColor1">
            Name<Required />
              </Label>
              <Input
                ref={this.firstInput}
                id='registration-name-input'
                name='name'
                className="inputField border3 backgroundColor4"
                required
              />
            </div>
            <div className='formField'>
              <Label htmlFor='registration-username-input' className="inputLabel backgroundColor6 border3 textColor1">
            Choose a Username<Required />
              </Label>
              <Input
                id='registration-username-input'
                name='username'
                className="inputField border3 backgroundColor4"
                required
              />
            </div>
            <div className='formField'>
              <Label htmlFor='registration-password-input' className="inputLabel backgroundColor6 border3 textColor1">
            Choose a Password<Required />
              </Label>
              <Input
                id='registration-password-input'
                name='password'
                type='password'
                className="inputField border3 backgroundColor4"
                required
              />
            </div>
            <Button type='submit'>
          Sign Up
            </Button>
            <footer>
              <p>Already have an account? <Link to='/login' style={{textDecoration: 'underline'}}>Log In!</Link></p>
              <p>Want to test out the app before registering? <Link to='/' onClick={this.handleTestLoginClick} style={{textDecoration: 'underline'}}>Log in as a test user.</Link></p>
              <p>Want to learn more about Munch Stats? Check out the <Link to='/about' style={{textDecoration: 'underline'}}>About page!</Link></p>
            </footer>
          </form>
        </div>
      );
    }
  }
}

export default RegistrationForm;