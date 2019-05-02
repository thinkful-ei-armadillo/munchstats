import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Input, Label } from '../Form/Form';
import AuthApiService from '../../services/auth-api-service';
import UserContext from '../../contexts/UserContext';
import Button from '../Button/Button';
import Loading from '../Loading/Loading';
import TokenService from '../../services/token-service'
import EventsApiService from '../../services/events-api-service'
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
        console.log(TokenService.parseJwt(res.authToken));
        this.props.onLoginSuccess();
        this.context.loadingFalse();
        EventsApiService.getTodaysEvents()
          .then(resj => console.log(resj))
          .then(res => this.context.setTodayEvents(res))
          .catch(e => this.context.setError(e));
      })
      .catch(res => {
        this.setState({ error: res.error });
        this.context.loadingFalse();
      });
  };

  componentDidMount() {
    this.firstInput.current.focus();
  }

  render() {

    if(this.context.loading){
      return <div className="center"><Loading /></div>;
    } else {

      const { error } = this.state;
      return (
        <form
          className='LoginForm'
          onSubmit={this.handleSubmit}>
          <div role='alert'>
            {error && <p>{error}</p>}
          </div>
          <div>
            <Label htmlFor='login-username-input'>
            Username
            </Label>
            <br />
            <Input
              ref={this.firstInput}
              id='login-username-input'
              name='username'
              required
            />
          </div>
          <br />
          <div>
            <Label htmlFor='login-password-input'>
            Password
            </Label>
            <br />
            <Input
              id='login-password-input'
              name='password'
              type='password'
              required
            />
          </div>
          <br />
          <Button type='submit'>
          Log In
          </Button>
          <footer>
            <p>Don't have an account? <Link to='/register' style={{textDecoration: 'none'}}>Sign Up!</Link></p>
          </footer>
        </form>
      );
    }}
}

export default LoginForm;