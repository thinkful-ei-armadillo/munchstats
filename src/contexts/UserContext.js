import React, { Component } from 'react';
import AuthApiService from '../services/auth-api-service';
import TokenService from '../services/token-service';
import IdleService from '../services/idle-service';

const UserContext = React.createContext({
  user: {},
  error: null,
  meals: [],
  loading: false,
  ingredient: {},
  todayEvents: [],
  clearIngredient: () => {},
  setError: () => {},
  clearError: () => {},
  setUser: () => {},
  processLogin: () => {},
  processLogout: () => {},
  loadingTrue: () => {},
  loadingFalse: () => {},
  setTodayEvents: () => {}
});

export default UserContext;

export class UserProvider extends Component {
  constructor(props) {
    super(props);
    const state = {
      user: {}, 
      error: null, 
      meals: [], 
      ingredient: {},
      chosenIngredient: '',
      finalIngredients: [],
      mealInfo: {},
      mealIngredients: [], 
      todayEvents: [],
      loading: false  
    };

    const jwtPayload = TokenService.parseAuthToken();

    if (jwtPayload){
      state.user = {
        id: jwtPayload.user_id,
        name: jwtPayload.name,
        username: jwtPayload.sub,
      };
    }
    this.state = state;
    IdleService.setIdleCallback(this.logoutBecauseIdle);
  }

  componentDidMount() {
    if (TokenService.hasAuthToken()) {
      IdleService.regiserIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        this.fetchRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  setIngredientWithNutritionStats = (ingredient) => {
    this.setState({
      ingredient
    });
  }

  clearIngredient = () => {
    this.setState({
      ingredient: {}
    });
  }

  setError = error => {
    this.setState({ error: error.error });
  }

  clearError = () => {
    this.setState({ error: null });
  }

  setUser = user => {
    this.setState({ user });
  }

  setMeals = meals => {
    this.setState({ meals });
  }

  deleteMeal = mealToDelete => {
    this.setMeals(this.state.meals.filter(meal => meal.id !== Number(mealToDelete)));
  }

  processLogin = authToken => {
    TokenService.saveAuthToken(authToken);
    const jwtPayload = TokenService.parseAuthToken();
    this.setUser({
      id: jwtPayload.user_id,
      name: jwtPayload.name,
      username: jwtPayload.sub
    });
    IdleService.regiserIdleTimerResets();
    TokenService.queueCallbackBeforeExpiry(() => {
      this.fetchRefreshToken();
    });
    AuthApiService.getUserBudgets()
      .then(res => {
        this.setUser({
          ...this.state.user,
          ...res.user[0]
        })
      })
  }

  processLogout = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({});
  }

  loadingFalse = () => {
    this.setState({loading: false});
  }

  loadingTrue = () => {
    this.setState({loading: true});
  }
  
  setTodayEvents = (todayEvents) => {
    this.setState({todayEvents});
  }


  logoutBecauseIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.setUser({ idle: true });
  }

  fetchRefreshToken = () => {
    AuthApiService.refreshToken()
      .then(res => {
        TokenService.saveAuthToken(res.authToken);
        TokenService.queueCallbackBeforeExpiry(() => {
          this.fetchRefreshToken();
        });
      })
      .catch(err => {
        this.setError(err);
      });
  }

  render() {
    const value = {
      user: this.state.user,
      error: this.state.error,
      meals: this.state.meals,
      ingredient: this.state.ingredient,
      loading: this.state.loading,
      setError: this.setError,
      clearError: this.clearError,
      clearIngredient: this.clearIngredient,
      setIngredientWithNutritionStats: this.setIngredientWithNutritionStats,
      setUser: this.setUser,
      setMeals: this.setMeals,
      processLogin: this.processLogin,
      processLogout: this.processLogout,
      ingredientInput: this.state.ingredientInput,
      results: this.state.results,
      chosenIngredient: this.state.chosenIngredient,
      finalIngredients: this.state.finalIngredients,
      mealInfo: this.state.mealInfo,
      mealIngredients: this.state.mealIngredients,
      loadingFalse: this.loadingFalse,
      loadingTrue: this.loadingTrue,
      todayEvents: this.state.todayEvents,
      setTodayEvents: this.setTodayEvents
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>
    );
  }
}