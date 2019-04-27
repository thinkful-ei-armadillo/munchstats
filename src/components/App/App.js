import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PublicOnlyRoute from '../PublicOnlyRoute/PublicOnlyRoute';
import RegistrationRoute from '../../routes/RegistrationRoute/RegistrationRoute';
import LoginRoute from '../../routes/LoginRoute/LoginRoute';
import DashboardRoute from '../../routes/DashboardRoute/DashboardRoute';
import NotFoundRoute from '../../routes/NotFoundRoute/NotFoundRoute';
import LogExerciseRoute from '../../routes/LogExerciseRoute/LogExerciseRoute';
import LogHomeRoute from '../../routes/LogHomeRoute/LogHomeRoute';
import LogMealRoute from '../../routes/LogMealRoute/LogMealRoute';
import LogSnackRoute from '../../routes/LogSnackRoute/LogSnackRoute';
import MealDetailsRoute from '../../routes/MealDetailsRoute/MealDetailsRoute';
import MealsRoute from '../../routes/MealsRoute/MealsRoute';
import './App.css';

export default class App extends Component {
  state = {
    hasError: false
  };

  static getDerivedStateFromError(error) {
    console.error(error);
    return {
      hasError: true
    };
  }

  render() {
    const { hasError } = this.state;

    return (
      <div className='App'>
        <Header />
        <main>
          {hasError && (
            <p>There was an error! Oh no!</p>
          )}
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
              path={'/loghome'}
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
              path={'/logexercise'}
              component={LogExerciseRoute}
            />
            <PublicOnlyRoute
              path={'/register'}
              component={RegistrationRoute}
            />
            <PublicOnlyRoute
              path={'/login'}
              component={LoginRoute}
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