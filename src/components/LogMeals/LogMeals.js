import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Button from '../Button/Button';
import config from '../../config';
import UserContext from '../../contexts/UserContext';
import MealsApiService from '../../services/meals-api-service';
import TokenService from '../../services/token-service';
import './logMeals.css';

const moment = require('moment');

export default class LogMeals extends Component {
  static contextType = UserContext;

  state = {
    meal: {}
  }

  componentDidMount(){
    this.context.clearError();
    MealsApiService.getMeals()
      .then(res => this.context.setMeals(res))
      .catch(e => this.context.setError(e));
  }

  genUserMeals(meals) {
    return (
      <select id="mealSelect" onChange = {() => this.setMeal()}>
        {meals.map((meal, key) =>
          <option value={meal.id} key={key}>{meal.name}</option>
        )}
      </select>
    );
  }

  setMeal = () => {
    const id = document.getElementById('mealSelect').value;
    const meal = this.context.meals.meal.find(obj => obj.id === Number(id));
    this.setState({meal});
  }

  handleAddLog(){
    let tag = document.getElementById('mealTag').value;
    let datetime = document.getElementsByClassName('form-control')[0].value;
    let date = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    console.log(
      JSON.stringify({
        name: this.state.meal.name,
        date: date,
        calories: this.state.meal.total_calorie,
        protein: this.state.meal.total_protein,
        fat: this.state.meal.total_fat,
        carbs: this.state.meal.total_carbs,
        tag: tag
      })
    );  
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
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : this.props.history.push('/log')
      );
  }

  render() {
    return (
      <div className="flex mealLogContainer">
        <section>
          {this.context.meals.meal ? this.genUserMeals(this.context.meals.meal) : null}
        </section>
        <section id="userTag">
          <select id="mealTag">
            <option value="breakfast">Breakfast</option>
            <option value="brunch">Brunch</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
          </select>
        </section>
        <Datetime defaultValue={moment()} locale={'true'}/>
        <Button onClick={() => this.handleAddLog()}>Add</Button>
      </div>
    );
  }
}