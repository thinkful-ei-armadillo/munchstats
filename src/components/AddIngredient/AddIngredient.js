import React, { Component } from 'react';
import Button from '../Button/Button';
import config from '../../config';
import MealsApiService from '../../services/meals-api-service';
import UserContext from '../../contexts/UserContext';

export default class AddIngredient extends Component {

  state = {
    ingredientInput: '',
    results: [],
    chosenIngredient: '',
    mealInfo: {},
    mealIngredients: []
  };

  static contextType = UserContext;

  getNutrientInfo = (e) => {
    e.preventDefault();
    let { quantity, measurements } = e.target;
    measurements = measurements.value.split(',');

    let uri = measurements[0];
    let label = measurements[1];

    const ingredients = [
      {
        'quantity': Number(quantity.value),
        'measureURI': uri,
        'foodId': this.state.chosenIngredient.id
      }
    ];

    const body = {
      ingredients,
      name: this.state.chosenIngredient.name,
      label,
      quantity: Number(quantity.value)
    };
    MealsApiService.getStatsforServing(body)
      .then(res => {
        //send ingredient to items table in database
        this.setState({
          chosenIngredient: '',
          ingredientInput: ''
        });

        let ingredient = {
            name: res.name,
            total_calorie: Math.round(res.total_calorie),
            total_fat: Math.round(res.total_fat),
            total_carbs: Math.round(res.total_carbs),
            total_protein: Math.round(res.total_protein),
            amount: Number(quantity.value),
            unit: res.unit
          }
        this.context.setIngredientWithNutritionStats(ingredient)
      });
  }

  getMealInfo() {
    return MealsApiService.getMealById(this.props.meal_id)
      .then(res => {
        if (res.length === 0) {
          this.props.history.push('/nothinghere');
        } else {
          // hacky fix to avoid react trying to set state on unmounted component
          if (res.length !== 0) {
            this.setState({ mealInfo: res[0] });
          }
        }
      })
      .catch(err => console.log(err));
  }

  handleInput = (e) => {
    this.setState({ ingredientInput: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ results: [], chosenIngredient: '' });
    let encodedInput = encodeURI(this.state.ingredientInput);
    MealsApiService.getIngredientsFromSearch(encodedInput)
      .then(results => {
        this.setState({ results });
      })
      .catch(err => console.log(err));
  }

  generateMeasureForm = () => {
    return (
      <form autoComplete="off" className='measureForm' onSubmit={e => this.getNutrientInfo(e)}>
        <p>{this.state.chosenIngredient.name}</p>
        <label htmlFor='quantity'>How much do you want to add?</label>
        <input type='number' name='quantity' min='0' step='.01' />
        <select name='measurements'>
          {this.state.chosenIngredient.measures.map((measure, index) => {
            return <option key={index} value={`${measure.uri},${measure.label}`} name={measure.label} >{measure.label}</option>;
          })}
        </select>
        <button type='submit'>Submit</button>
      </form>
    );
  }

  generateResults = () => {
    return this.state.results.map((item, key) => <div id='results' key={key} onClick={() => this.handleClickIngredient(item)}><span>{item.name}</span></div>);
  }

  handleClickIngredient = (item) => {
    this.setState({
      chosenIngredient: item,
      results: []
    });
  }

  render() {
    return (
      <>
        <form
          className='mealForm'
          onSubmit={this.handleSubmit}
        >
          {/* <div role='alert'>
              {error && <p>{error}</p>}
            </div> */}
          <label htmlFor='ingredient-input'>
            Ingredient
          </label>
          <input
            ref={this.firstInput}
            id='ingredient-input'
            name='ingredient-input'
            value={this.state.ingredientInput}
            onChange={this.handleInput}
            required
          />
          <Button type='submit'>
            Search ingredients
          </Button>
        </form>

        {this.state.chosenIngredient ? this.generateMeasureForm() : null}

        <section className="results">
          {(this.state.results.length >= 1) && <h4>Pick one from below</h4>}
          {(this.state.results.length >= 1) && this.generateResults()}
        </section>
      </>
    );
  }
}