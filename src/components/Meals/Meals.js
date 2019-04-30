import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import MealsApiService from '../../services/meals-api-service';
import { Link } from 'react-router-dom';
import './Meals.css';
import Loading from '../Loading/Loading';

export default class Meals extends Component {
  static contextType = UserContext;

  state = {
    mealInput: '',
    meals: []
  };

  componentDidMount() {
    this.context.clearError();
    this.context.loadingTrue();
    MealsApiService.getMeals()
      .then(res => {
        this.context.setMeals(res); 
        this.context.loadingFalse();
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });
  }

  handleInput = (e) => {
    this.setState({
      mealInput: e.target.value
    });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.loadingTrue();
    const name  = e.target.mealInput.value;
    const user_id = this.context.user.id;

    this.setState({error: null});

    MealsApiService.postMeal({
      name,
      user_id
    })
      .then(res => {
        this.handleCreationSuccess(res[0].id);
        this.context.loadingFalse();
      })
      .catch(res => {
        this.setState({ error: res.error });
        this.context.loadingFalse();
      });
  }

  handleCreationSuccess = (id) => {
    const history = this.props.history;
    history.push(`/meals/${id}`);
  }

  handleClickDelete = (meal) => {
    this.context.loadingTrue();
    MealsApiService.deleteMeal(meal)
      .then(() => {
        MealsApiService.getMeals()
          .then(res => {
            this.context.setMeals(res);
            this.context.loadingFalse();
          })
          .catch(e => {
            this.context.setError(e);
            this.context.loadingFalse(); 
          });
      });
  }

  genUserMeals(meals) {
    return (
      <ul className='MealsPage__meals'>
        {meals.map(meal =>
          <li key={meal.id} className='MealsPage__meals'>
            <span className = 'mealPageMealName'>{meal.name}</span> 
            <br />
            <Link
              to={`/meals/${meal.id}`}
              style={{textDecoration: 'none'}}>
              <Button type="button" className='editMeal'>
                Edit Meal
              </Button>
            </Link>
            <br />
            <Button onClick={() => this.handleClickDelete(meal)}>Delete Meal</Button>
          </li>
        )}
      </ul>
    );
  }
  
  render() {
    if(this.context.loading){
      return <div className="center"><Loading/></div>;
    } else {
      return (
        <div>
          <form
            className='mealCreationForm'
            onSubmit={this.handleSubmit}>
            {/* <div role='alert'>
            {error && <p>{error}</p>}
          </div> */}
            <label htmlFor='mealInput'>
            New Meal Name
            </label>
            <br />
            <input
              ref={this.firstInput}
              id='mealInput'
              name='mealInput'
              value={this.state.mealInput}
              onChange={this.handleInput}
              autoComplete="off"
              maxLength="60"
              required />
            <br />
            <Button type='submit'>
            Add Meal
            </Button>
          </form>
          <section className="mealsContainer">
            {this.context.meals.meal ? this.genUserMeals(this.context.meals.meal) : null}
          </section>
        </div>
      );}
  }
}