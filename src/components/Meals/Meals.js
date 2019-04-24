import React, { Component } from 'react';
import Button from '../Button/Button';
import './Meals.css';

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
    this.setState({results: []})
    let encodedInput = encodeURI(this.state.ingredientInput)
    fetch(``)
      .then(res => res.json())
      .then(res => {
        for(let i = 0; i < 10; i++){
          let item = res.hints[i]
          let newIngredient = {
            id: item.food.foodId,
            name: item.food.label,
            calories: (item.food.nutrients.ENERC_KCAL) ? item.food.nutrients.ENERC_KCAL : 0,
            protein: (item.food.nutrients.PROCNT) ? item.food.nutrients.PROCNT : 0,
            fat: (item.food.nutrients.FAT) ? item.food.nutrients.FAT : 0,
            carbs: (item.food.nutrients.CHOCDF) ? item.food.nutrients.CHOCDF : 0,
            image: item.food.image,
            measures: item.measures
          }
          this.setState({results: [...this.state.results, newIngredient]})
         
        }
      })
      .catch(err => console.log(err))
      
  }

  handleClickIngredient = (item) => {
    this.setState({ 
      chosenIngredient: item, 
      results: []
    })
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
    return <form className="measureForm" onSubmit = {e => this.getNutrientInfo(e)}>
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
    return this.state.results.map((item, key) => <div id="result" key={key} onClick={() => this.handleClickIngredient(item)}><span>{item.name}</span></div>
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
    return <div className="nutritionInfo">
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
          <br />
          <input
            ref={this.firstInput}
            id='ingredient-input'
            name='ingredient-input'
            value = {this.state.ingredientInput}
            onChange = {this.handleInput}
            required
          />
        </div>
        <br />
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
