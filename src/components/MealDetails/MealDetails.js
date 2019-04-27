import React, { Component } from 'react';
import Button from '../Button/Button';
import config from '../../config';
import TokenService from '../../services/token-service';
import './MealDetails.css';

export default class Meals extends Component {
  state = {
    ingredientInput: '',
    results: [],
    chosenIngredient: '',
    finalIngredients: [],
    mealInfo: {},
    mealIngredients: []
  };

  componentDidMount() {
    this.getMealInfo();
    this.getMealIngredients();
  }

  getMealInfo(){
    return fetch(`${config.API_ENDPOINT}/meal/${this.props.meal_id}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => 
        (!res.ok) 
          ? res.json().then(e => Promise.reject(e)) 
          : res.json()
      )
      .then(res => {
        if(res.length === 0){
          this.props.history.push('/nothinghere');
        } else {
          // hacky fix to avoid react trying to set state on unmounted component
          if(res.length !== 0){
            this.setState({mealInfo: res[0]});
          }
        }
      })
      .catch(err => console.log(err));
  }

  getMealIngredients(){
    return fetch(`${config.API_ENDPOINT}/ingredients`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({meal: {id: this.props.meal_id}})
    })
      .then(res => 
        (!res.ok) 
          ? res.json().then(e => Promise.reject(e)) 
          : res.json()
      )
      .then(res => this.setState({mealIngredients: res.ingredients}))
      .catch(err => console.log(err));
  }

  handleInput = (e) => {
    this.setState({ ingredientInput: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.setState({ results: [], chosenIngredient: '' });
    let encodedInput = encodeURI(this.state.ingredientInput);
    fetch(`${config.API_ENDPOINT}/proxy/foods`, {
      method: 'POST',
      body: JSON.stringify({food: encodedInput}),
      headers: {
        'content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(results => {
        this.setState({ results});
      })
      .catch(err => console.log(err));
  }

  handleClickIngredient = (item) => {
    this.setState({
      chosenIngredient: item,
      results: []
    });
  }

  /*
  // this method is kind of a monster and
  // could probably be split up later.
  // possibly make another service file
  */
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

    fetch(`${config.API_ENDPOINT}/proxy/nutrition`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'content-Type': 'application/json'
      }
    })
      .then(res => {
        return (res.json());
      })
      .then(res => {
        //send ingredient to items table in database
        this.setState({
          finalIngredients: [...this.state.finalIngredients, res],
          chosenIngredient: '',
          ingredientInput: ''
        });
        let results = {
          ingredient: {
            meal_id: Number(this.props.meal_id),
            name: res.name,
            total_calorie: Math.round(res.total_calorie),
            total_fat: Math.round(res.total_fat),
            total_carbs: Math.round(res.total_carbs),
            total_protein: Math.round(res.total_protein),
            amount: Number(quantity.value),      
            unit: res.unit
          }
        };
        fetch(`${config.API_ENDPOINT}/ingredients/${this.props.meal_id}`, {
          method: 'POST',
          body: JSON.stringify(results),
          headers: {
            'content-type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        })
          .then(test => test.json())
          .then(() => {
            // add calorie/fat/carb/protein counts to meal totals
            const newMealStats = {
              total_calorie: Number(this.state.mealInfo.total_calorie) + Number(results.ingredient.total_calorie),
              total_fat: Number(this.state.mealInfo.total_fat) + Number(results.ingredient.total_fat),
              total_carbs: Number(this.state.mealInfo.total_carbs) + Number(results.ingredient.total_carbs),
              total_protein: Number(this.state.mealInfo.total_protein) + Number(results.ingredient.total_protein)
            };
            const patchedMeal = {'meal': {...this.state.mealInfo, ...newMealStats} };
            fetch(`${config.API_ENDPOINT}/meal`, {
              method: 'PATCH',
              body: JSON.stringify(patchedMeal),
              headers: {
                'content-Type': 'application/json',
                'authorization': `bearer ${TokenService.getAuthToken()}`
              }
            })
              .then(() => {
                this.getMealInfo();
                this.getMealIngredients();
              });
          });
      });
  }

  generateMeasureForm = () => {
    return (
      <form autoComplete="off" className='measureForm' onSubmit={e => this.getNutrientInfo(e)}>
        <p>{this.state.chosenIngredient.name}</p>
        <label htmlFor='quantity'>How much do you want to add?</label>
        <input type='number' name='quantity' min='0' step='.01'/>
        <select name='measurements'>
          {this.state.chosenIngredient.measures.map((measure, index) => {
            return <option key={index} value={`${measure.uri},${measure.label}`} name={measure.label} >{measure.label}</option>;
          })}
        </select>
        <button type='submit'>Submit</button>
      </form>
    );
  }

  // generates the results that come from querying the third-party API for ingredients
  generateResults = () => {
    return this.state.results.map((item, key) => <div id = 'results' key={key} onClick={() => this.handleClickIngredient(item)}><span>{item.name}</span></div>);
  }

  renderMealStats() {
    return <>
        <h4>Meal Nutrition Information</h4>
        <div className='nutritionInfo' >
          <p>calories: {Math.round(this.state.mealInfo.total_calorie)}</p>
          <p> fat: {Math.round(this.state.mealInfo.total_fat)} </p>
          <p>carbs: {Math.round(this.state.mealInfo.total_carbs)} </p>
          <p>protein: {Math.round(this.state.mealInfo.total_protein)}</p>
        </div>
      </>
  }

  generateFinalIngredients = () => {
    return this.state.mealIngredients.map((item, key) => <div key={key}>
      <span>
        {item.name} | {item.amount} {item.unit}
      </span>
      <span onClick={() => this.handleClickDelete(item.id)}><i class="fas fa-trash"></i></span>
    </div>
    );
  }

  handleClickDelete = (ingredient) => {
    fetch(`${config.API_ENDPOINT}/ingredients/`, {
      method: 'DELETE',
      body: JSON.stringify({ingredient_id: ingredient.id}),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json)
      .then(() => {
        // subtract calorie/fat/carb/protein counts to meal totals
        const newMealStats = {
          total_calorie: Number(this.state.mealInfo.total_calorie) - Number(ingredient.total_calorie),
          total_fat: Number(this.state.mealInfo.total_fat) - Number(ingredient.total_fat),
          total_carbs: Number(this.state.mealInfo.total_carbs) - Number(ingredient.total_carbs),
          total_protein: Number(this.state.mealInfo.total_protein) - Number(ingredient.total_protein)
        };
        const patchedMeal = {'meal': {...this.state.mealInfo, ...newMealStats} };

        fetch(`${config.API_ENDPOINT}/meal`, {
          method: 'PATCH',
          body: JSON.stringify(patchedMeal),
          headers: {
            'Content-Type': 'application/json',
            'authorization': `bearer ${TokenService.getAuthToken()}`
          }
        })
          .then(() => {
            this.getMealInfo();
            this.getMealIngredients();
          });
      })
      .then(() => {
        this.getMealInfo();
        this.getMealIngredients();
      })
      .catch(err => console.log(err));
  }

  handleGoBackClicked = () => {
    this.props.history.push('/meals');
  }

  render() {
    return (
      <>
        <section className='goBack'>
          <span onClick={() => this.handleGoBackClicked()} className='back_button'><i class="fas fa-chevron-left"></i></span>
        </section>
        <h3 className='mealName'>{this.state.mealInfo ? this.state.mealInfo.name : ''}</h3>

        <div className = 'mealContainer'> {/* main flex */}

          <div className = 'addIngredientContainer'>
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
          </div>


          <div className = 'statsContainer'>

            <section className = 'finalIngredientsContainer'>
              <h4>Meal Ingredients</h4>
              <div className="finalIngredients">
                {(this.state.mealIngredients[0]) ? this.generateFinalIngredients() : 'Nothing so far!'}
              </div>
            </section>
            <section className='currentMealStats'>
              {this.renderMealStats()}
            </section>
          </div>
          
        </div>
      </>
    );
  }
}