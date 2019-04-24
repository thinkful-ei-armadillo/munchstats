import React, { Component } from 'react'
import Button from '../Button/Button'
import UserContext from '../contexts/UserContext'
import MealsApiService from '../../services/meals-api-service'
import { Link } from 'react-router-dom'

export default class Meals extends Component {
  static contextType = UserContext

  state = {
    mealInput: '',
    meals: []
  }

  componentDidMount() {
    this.context.clearError()
    MealsApiService.getMeals
      .then(this.context.setMeals)
      .catch(this.context.setError)
  }

  handleInput = (e) => {
    this.setState({mealInput: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
      
  }

  handleClickDelete = (item) => {

  }

  render() {

    return (
      <div>
        <form
        className='mealCreationForm'
        onSubmit={this.handleSubmit}
      >
        {/* <div role='alert'>
          {error && <p>{error}</p>}
        </div> */}
        <div>
          <label htmlFor='meal-input'>
            New Meal Name
          </label>
          <input
            ref={this.firstInput}
            id='meal-input'
            name='meal-input'
            value = {this.state.mealInput}
            onChange = {this.handleInput}
            required
          />
        </div>
        <Button type='submit'>
          Add Meal
        </Button>
        </form>
        <UserMeals meals={this.state.meals} />


      </div>
    );
  }
}

function UserMeals( { meals = [] }) {
  
  return (
    <ul className='MealsPage__meals'>
      {meals.map(meal =>
        <li key={meal.id} className='MealsPage__meals'>
          {meal.name}
          <Link to={`/meals/${meal.id}`}>Edit Meal</Link>
          <Button onClick={() => this.handleClickDelete()} className='delete_button'>Delete Meal</Button>
        </li>
      )}
    </ul>
  )
}