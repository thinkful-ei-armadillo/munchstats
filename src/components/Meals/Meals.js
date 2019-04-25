import React, { Component } from 'react'
import Button from '../Button/Button'
import UserContext from '../../contexts/UserContext'
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
    MealsApiService.getMeals()
      .then(res => this.context.setMeals(res))
      .catch(e => this.context.setError(e))
  }

  handleInput = (e) => {
    this.setState({mealInput: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const name  = e.target.mealInput.value
    const user_id = this.context.user.id;

    this.setState({error: null})
    MealsApiService.postMeal({
      name,
      user_id
    })
      .then(res => {
        console.log(res)
        this.handleCreationSuccess(res[0].id)
      })
      .catch(res => {
        this.setState({ error: res.error })
      })
      
  }

  handleCreationSuccess = (id) => {
    const history = this.props.history
    history.push(`/meals/${id}`);
  }

  handleClickDelete = (e) => {
    const { mealId } = e.currentTarget.value;
    MealsApiService.deleteMeal(mealId)
      .then(this.context.deleteMeal(mealId))
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
        <label htmlFor='mealInput'>
          New Meal Name
        </label>
        <input
          ref={this.firstInput}
          id='mealInput'
          name='mealInput'
          value = {this.state.mealInput}
          onChange = {this.handleInput}
          required
        />
        <Button type='submit'>
          Add Meal
        </Button>
        </form>
        <UserMeals meals={this.context.meals.meal} />
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
