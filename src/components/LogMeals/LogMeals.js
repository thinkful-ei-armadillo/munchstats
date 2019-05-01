import React, { Component } from 'react';
import Datetime from 'react-datetime';
import Button from '../Button/Button';
import config from '../../config';
import UserContext from '../../contexts/UserContext';
import MealsApiService from '../../services/meals-api-service';
import TokenService from '../../services/token-service';

const moment = require('moment');

export default class LogMeals extends Component {
  static contextType = UserContext;

  componentDidMount(){
    this.context.clearError();
    MealsApiService.getMeals()
      .then(res => this.context.setMeals(res))
      .catch(e => this.context.setError(e));
  }

  genUserMeals(meals) {
    return (
      <ul className='LogMealsPage__meals'>
        {meals.map(meal =>
          <li key={meal.id} className='LogMealsPage__meals'>
            <h3 className='logMealPageMealName'>{meal.name}</h3> 
            <br />
            <Datetime />
            <br />
            <label htmlFor="userTag">Tag</label>
            <section id="userTag">
              <select id="mealTag">
                <option value="breakfast">Breakfast</option>
                <option value="brunch">Brunch</option>
                <option value="lunch">Lunch</option>
                <option value="dinner">Dinner</option>
              </select>
            </section>
            <br />
            <Button onClick={() => this.getDatetimeInput(meal)}>Add</Button>
          </li>
        )}
      </ul>
    );
  }

  getDatetimeInput(meal){
    let tag = document.getElementById('mealTag');
<<<<<<< HEAD
    let datetime = document.getElementsByClassName('form-control')[0].value;
    let date = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    this.handleAddLog(meal, date, tag.value);
  }

  handleAddLog(meal, date, tag){
    console.log(
      JSON.stringify({
        name: meal.name,
        date,
        calories: meal.total_calorie,
        protein: meal.total_protein,
        fat: meal.total_fat,
        carbs: meal.total_carbs,
        tag
      })
    );  
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: meal.name,
        date,
        calories: meal.total_calorie,
        protein: meal.total_protein,
        fat: meal.total_fat,
        carbs: meal.total_carbs,
        tag
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
=======
    
    if(hour.value !== '12'){
      if(ampm.value === 'AM'){
        hour = hour.value;
      }
      if(ampm.value === 'PM'){
        hour = Number(hour.value) + 12;
      }
    }

    if(hour.value === '12'){
      if(ampm.value === 'AM'){
        hour = '00';
      }
      if(ampm.value === 'PM'){
        hour = '12';
      }
    }

    let date = `${year.value}-${month.value}-${day.value} ${hour}:${mins.value}:00`;
    
    MealsApiService.logFood(meal, date, tag.value);
>>>>>>> c5388a04009ff21dd1d4846c58c83e1cc96c1877
  }

  render() {
    return (
      <div>
        <section className="mealsContainer">
          {this.context.meals.meal ? this.genUserMeals(this.context.meals.meal) : null}
        </section>
      </div>
    );
  }
}