import React, { Component } from 'react';
import Button from '../Button/Button';
import config from '../../config';

export default class AddIngredient extends Component {
  
  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ results: [], chosenIngredient: '' });
    
    let encodedInput = encodeURI(this.state.ingredientInput);
    fetch(`${config.API_ENDPOINT}/proxy/foods`, {
      method: 'POST',
      body: JSON.stringify({ food: encodedInput }),
      headers: {
        'content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({ results });
      })
      .catch(err => console.log(err));
  }

  render() { 
    return (
      <div className='addIngredientContainer'>
        <h3>Add an ingredient to your meal</h3>
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
            // ref={this.firstInput}
            id='ingredient-input'
            name='ingredient-input'
            // value={this.state.ingredientInput}
            // onChange={this.handleInput}
            required
          />
          <Button type='submit'>
            Search ingredients
          </Button>
        </form>

        {/* {this.state.chosenIngredient ? this.generateMeasureForm() : null} */}

        <section className="results">
          {/* {(this.state.results.length >= 1) && <h4>Pick one from below</h4>}
          {(this.state.results.length >= 1) && this.generateResults()} */}
        </section>
      </div>
    );
  }
}