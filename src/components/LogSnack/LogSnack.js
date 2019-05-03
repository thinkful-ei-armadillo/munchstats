import React, { Component } from 'react';
import AddIngredient from '../AddIngredient/AddIngredient';
import UserContext from '../../contexts/UserContext';
import Datetime from 'react-datetime';
import config from '../../config';
import TokenService from '../../services/token-service';
import './LogSnack.css';
import Error from '../Error/Error';
const moment = require('moment');

export default class LogSnack extends Component {
  static contextType = UserContext;

  handleAddLog(){
    this.context.loadingTrue();
    this.context.clearError();
    let datetime = document.getElementsByClassName('form-control')[0].value;
    let date = moment(datetime).format('YYYY-MM-DD HH:mm:ss');
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: this.context.ingredient.name,
        date: date,
        calories: this.context.ingredient.total_calorie,
        protein: this.context.ingredient.total_protein,
        fat: this.context.ingredient.total_fat,
        carbs: this.context.ingredient.total_carbs,
        tag: 'snack'
      })
    })
      .then(res =>{
        this.context.loadingFalse();
        (!res.ok)
          ? res.json().then(e => {
            this.context.setError(e);
            Promise.reject(e);})
          : this.props.history.push('/log');}
      );
  }

  componentWillUnmount() {
    this.context.clearIngredient();
  }

  render() {
    if (this.context.ingredient.name) {
      return (
        <div>
          <Error />
          <div className="mealLogContainer">
            <h3>when did you eat the {this.context.ingredient.name}?</h3>
            <Datetime defaultValue={moment()} locale={'true'}/>
            <button onClick={() => this.handleAddLog()}>Log Your Snack!</button>
          </div>
        </div>
      );
    }

    return (
      <div className="mealLogContainer">
        <h3>Log a Single Item Snack!</h3>
        <AddIngredient />
      </div>
    );
  }
}