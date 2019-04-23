import React, { Component } from 'react'
import Button from '../Button/Button'

export default class Meals extends Component {
  state = {
    ingredientInput: '',
    results: [],
    chosenIngredients: []
  }

  handleInput = (e) => {
    this.setState({ingredientInput: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({results: []})
    let encodedInput = encodeURI(this.state.ingredientInput)
    fetch()
      .then(res => res.json())
      .then(res => {
        console.log(res.hints);
        for(let i = 0; i < 10; i++){
          let item = res.hints[i]
          let newIngredient = {
            id: item.food.foodId,
            name: item.food.label,
            calories: item.food.nutrients.ENERC_KCAL,
            protein: item.food.nutrients.PROCNT,
            fat: item.food.nutrients.FAT,
            carbs: item.food.nutrients.CHOCDF,
            image: item.food.image,
            measures: item.measures
          }
          this.setState({results: [...this.state.results, newIngredient]})
        }
      })
      .catch(err => console.log(err))
  }

  generateResults = () => {
    return this.state.results.map((item, key) => <div key={key} onClick={() => this.setState({chosenIngredients: [...this.state.chosenIngredients, item]})}><span>{item.name}</span></div>
    )
  }

  generateChosenIngredients = () => {
    return this.state.chosenIngredients.map((item, key) => <div key={key}><span>{item.name}</span></div>
    )
  }

  render() {

    return (
      <div>
        <form
        className='mealForm'
        onSubmit={this.handleSubmit}
      >
        {/* <div role='alert'>
          {error && <p>{error}</p>}
        </div> */}
        <div>
          <label htmlFor='ingredient-input'>
            Ingredient
          </label>
          <input
            ref={this.firstInput}
            id='ingredient-input'
            name='ingredient-input'
            value = {this.state.ingredientInput}
            onChange = {this.handleInput}
            required
          />
        </div>
        <Button type='submit'>
          Search ingredients
        </Button>
      </form>
      <section className="results">
        {this.state.results ? this.generateResults() : null}
      </section>
      <section className="chosenIngredients">
        <h3>Your meal includes:</h3>
        {this.state.chosenIngredients ? this.generateChosenIngredients() : 'Nothing so far!'}
      </section>
      </div>
    );
  }
}
