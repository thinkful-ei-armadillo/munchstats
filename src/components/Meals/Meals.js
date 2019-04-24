import React, { Component } from 'react'
import Button from '../Button/Button'

export default class Meals extends Component {
  state = {
    ingredientInput: '',
    results: [],
    chosenIngredient: '',
    finalIngredients: []
  }

  handleInput = (e) => {
    this.setState({ingredientInput: e.target.value})
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
      
  }

  handleClickEdit = (item) => {
    
  }

  handleClickDelete = (item) => {

  }
  
  getNutrientInfo = (e) => {
    e.preventDefault();
    let { quantity, measurements } = e.target;
    measurements = measurements.value.split(',');

    let uri = measurements[0];
    let label = measurements[1];

    const ingredient = {
      "ingredients":
      [
        {
          "quantity": Number(quantity.value),
          "measureURI": uri,
          "foodId": this.state.chosenIngredient.id
        }
      ]
    }

    fetch(``, {
      method: 'POST',
      body: JSON.stringify(ingredient),
      headers: {
        'Content-Type': 'application/json'
      }
    }
    ).then(res => {
     return (res.json())
    }).then(res => {
      let resultIngredient = {
        name: this.state.chosenIngredient.name,
        meal_id: 1,
        total_calorie: res.calories,
        total_fat:(res.totalNutrients.FAT) ? res.totalNutrients.FAT.quantity : 0,
        total_carbs: (res.totalNutrients.CHOCDF) ? res.totalNutrients.CHOCDF.quantity: 0,
        total_protein: (res.totalNutrients.PROCNT) ? res.totalNutrients.PROCNT.quantity: 0,
        amount: quantity.value,
        unit: label
      }
      //send ingredient to items table in database
      this.setState({
        finalIngredients: [...this.state.finalIngredients, resultIngredient],
        chosenIngredient: '',
        ingredientInput: '',
      })
    })
  }

  generateMeasureForm = () => { 
    return <form onSubmit = {e => this.getNutrientInfo(e)}>
        <p>{this.state.chosenIngredient.name}</p>
        <label htmlFor ='quantity'>how much do you want to add?</label>
        <input type = 'number' name = 'quantity' min = '0' step = '.25'>
        </input>
        <select name = 'measurements'>
          {this.state.chosenIngredient.measures.map((measure, index) => {
            return <option key={index} value={`${measure.uri},${measure.label}`} name={measure.label} >{measure.label}</option>
        })}
      </select>
      <button type = 'submit'> submit </button>
    </form>
  }

  generateResults = () => {
    return this.state.results.map((item, key) => <div key={key} onClick={() => this.handleClickIngredient(item)}><span>{item.name}</span></div>
    )
  }

  generateMealStats = () => {
    let fat = 0;
    let calories = 0;
    let carbs = 0;
    let protein = 0;
    this.state.finalIngredients.map((item, key) => {
      console.log(item)
      fat += Number(item.total_fat)
      calories += Number(item.total_calorie)
      carbs += Number(item.total_carbs)
      protein += Number(item.total_protein)
    })
    console.log(Math.round(fat), Math.round(calories), Math.round(carbs), Math.round(protein))
    return <div>
      <h4>Meal Nutrition Information</h4>
      <p>calories: {Math.round(calories)}</p><p> fat: {Math.round(fat)} </p><p>carbs: {Math.round(carbs)} </p><p>protein: {Math.round(protein)}</p>
    </div>
  }

  generateFinalIngredients = () => {
    return this.state.finalIngredients.map((item, key) => <div key={key}>
      <span>
        {item.name} | {item.amount} {item.unit}
      </span>
    </div>
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

      <div>
        {this.state.chosenIngredient ? this.generateMeasureForm() : null}
      </div>

      <section className="finalIngredients">
        <h3>Your meal includes:</h3>
        {(this.state.finalIngredients[0]) ? this.generateFinalIngredients() : 'Nothing so far!'}
        {(this.state.finalIngredients[0]) ? this.generateMealStats() : ''}

      </section>


      </div>
    );
  }
}
