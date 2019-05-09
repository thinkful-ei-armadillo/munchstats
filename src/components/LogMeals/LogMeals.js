import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Button from '../Button/Button';
import config from '../../config';
import UserContext from '../../contexts/UserContext';
import MealsApiService from '../../services/meals-api-service';
import TokenService from '../../services/token-service';
import Loading from '../Loading/Loading';
import './logMeals.css';
import Error from '../../components/Error/Error';
import Back from '../../components/Back/Back';
const moment = require('moment');

export default class LogMeals extends Component {
  static contextType = UserContext;

  state = {
    meal: {}
  };

  componentDidMount(){

    this.context.loadingTrue();
    this.context.clearError();
    MealsApiService.getMeals()
      .then(res => {
        this.context.loadingFalse();
        this.context.setMeals(res);
        this.setMeal();
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });      
  }

  genUserMeals(meals) {
    return (
      <label>
        Select Meal
        <br />
        <select id="mealSelect" onChange = {() => this.setMeal()}>
          {meals.map((meal, key) =>
            <option value={meal.id} key={key}>{meal.name}</option>
          )}
        </select>
      </label>
    );
  }

  setMeal = () => {
    const id = document.getElementById('mealSelect').value;
    const meal = this.context.meals.meal.find(obj => obj.id === Number(id));
    this.setState({meal});
  }

  handleAddLog(){
    this.context.loadingTrue();
    this.context.clearError();
    let tag = document.getElementById('mealTag').value;
    let datetime = document.getElementsByClassName('form-control')[0].value;
    let date = moment(datetime).format('YYYY-MM-DD HH:mm:ss'); 
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: this.state.meal.name,
        date: date,
        calories: this.state.meal.total_calorie,
        protein: this.state.meal.total_protein,
        fat: this.state.meal.total_fat,
        carbs: this.state.meal.total_carbs,
        tag: tag
      })
    })
      .then(res => {
        this.context.loadingFalse();
        (!res.ok)
          ? res.json().then(e => {
            this.context.setError(e);
            Promise.reject(e);})
          : this.props.history.push('/log');
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });
  }

  render() {

    if(this.context.loading){
      return (
        <div className="center">
          <Loading />
        </div>
      );
    }
    else {
      return (
        <div>
          <Back history={this.props.history} path={'/log'} />
          <Error />
          <div className="flex mealLogContainer">
            <section>
              {this.context.meals.meal ? this.genUserMeals(this.context.meals.meal) : null}
            </section>
            <br />
            <section id="userTag">
              <label>
                Select Tag
                <br />
                <select id="mealTag">
                  <option value="breakfast">Breakfast</option>
                  <option value="brunch">Brunch</option>
                  <option value="lunch">Lunch</option>
                  <option value="dinner">Dinner</option>
                </select>
              </label>
            </section>
            <br />
              Select Date & Time
              <Datetime className='textColor1' closeOnSelect={true} inputProps={{ readOnly: true }} defaultValue ={moment()}/>
            
            <Button onClick={() => this.handleAddLog()}>Add</Button>
          </div>
        </div>
      );
    }
  }
}