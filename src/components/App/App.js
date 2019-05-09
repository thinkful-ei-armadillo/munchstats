import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import ProfileRoute from '../../routes/ProfileRoute/ProfileRoute';
import LogHomeRoute from '../../routes/LogHomeRoute/LogHomeRoute';
import LogMealRoute from '../../routes/LogMealRoute/LogMealRoute';
import LogSnackRoute from '../../routes/LogSnackRoute/LogSnackRoute';
import MealDetailsRoute from '../../routes/MealDetailsRoute/MealDetailsRoute';
import MealsRoute from '../../routes/MealsRoute/MealsRoute';
import AboutRoute from '../../routes/AboutRoute/AboutRoute';
import AuthApiService from '../../services/auth-api-service';
import EventsApiService from '../../services/events-api-service';
import UserContext from '../../contexts/UserContext';
import './App.css';
import Loading from '../Loading/Loading';
import ChartRoute from '../../routes/ChartRoute/ChartRoute';
import './ColorStyles.css';

export default class App extends Component {
  state = {
    hasError: false,
    error: ''
  };

  static contextType = UserContext;

  static getDerivedStateFromError(error) {
    console.error(error);
    return {
      hasError: true,
    };
  }

  static contextType = UserContext;

  componentDidMount() {
  
    AuthApiService.getUserBudgets()
      .then(res => {
        this.context.setUser({
          ...this.context.user,
          ...res.user[0]
        });
        if (res.user[0].isDark) {
          document.documentElement.setAttribute('theme', 'dark');
        }
        else {
          document.documentElement.setAttribute('theme', 'light');
        } 
      });
    EventsApiService.getTodaysEvents()
      .then(sortedEvents => this.context.setTodayEvents(sortedEvents));

  }

  render() {
    return (
      <div className='App'>
        <Header />
        <main>
          <Switch>
            <PrivateRoute
              exact
              path={'/'}
              component={DashboardRoute}
            />
            <PrivateRoute
              exact path={'/meals'}
              component={MealsRoute}
            />
            <PrivateRoute
              path={'/meals/:meal_id'}
              component={MealDetailsRoute}
            />
            <PrivateRoute
              path={'/log'}
              component={LogHomeRoute}
            />
            <PrivateRoute
              path={'/logmeal'}
              component={LogMealRoute}
            />
            <PrivateRoute
              path={'/logsnack'}
              component={LogSnackRoute}
            />
            <PrivateRoute
              path={'/profile'}
              component={ProfileRoute}
            />
            <PrivateRoute
              path={'/charts'}
              component={ChartRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
            />
            <PublicOnlyRoute
              path={'/about'}
              component={AboutRoute}
            />
            <Route 
              path={'/loading'}
              component = {Loading}
            />
            <Route
              component={NotFoundRoute}
            />
          </Switch>
        </main>
      </div>
    );
  }
}