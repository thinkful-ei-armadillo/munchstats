import React, { Component } from 'react';
import Button from '../Button/Button';
import ProxyApiService from '../../services/proxy-api-service';
import UserContext from '../../contexts/UserContext';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';

export default class AddIngredient extends Component {

  state = {
    ingredientInput: '',
    ingredientQuantity: '',
    results: [],
    chosenIngredient: '',
    mealInfo: {},
    mealIngredients: [],
    hasResults: null
  };

  static contextType = UserContext;

  getNutrientInfo = (e) => {
    e.preventDefault();
    this.context.loadingTrue();
    this.context.clearError();
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

    ProxyApiService.getStatsforServing(body)
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
        };

        this.context.setIngredientWithNutritionStats(ingredient);
        this.context.loadingFalse();
        this.props.handleModal();
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });
  }

  handleInput = (e) => {
    this.setState({ ingredientInput: e.target.value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.context.loadingTrue();
    this.context.clearError();
    this.setState({ingredientQuantity: '' });
    this.setState({ results: [], chosenIngredient: ''});
    let encodedInput = encodeURI(this.state.ingredientInput);
    ProxyApiService.getIngredientsFromSearch(encodedInput)
      .then(results => {
        console.log('results', results);
        if(results.length === 0){
          this.setState({hasResults: false});
          this.context.loadingFalse();
        } else {
          this.setState({ results, hasResults: true });
          this.context.loadingFalse();
        }
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });
  }

  handleQuantityInput = (e) => {
    this.setState({ ingredientQuantity: e.target.value });
  }

  generateMeasureForm = () => {
    if(this.context.loading){
      return (
        <div className='center'>
          <Loading />
        </div>
      );
    } else {
      return (
        <form autoComplete="off" className='measureForm' onSubmit={e => this.getNutrientInfo(e)}>
          <p>{this.state.chosenIngredient.name}</p>
          <label htmlFor='quantity'>How much do you want to add?</label>
          <br />
          <input type='number' name='quantity' min='0' step='.01' value={this.state.ingredientQuantity} onChange={(e) => this.handleQuantityInput(e)} required/>
          <select name='measurements'>
            {this.state.chosenIngredient.measures.map((measure, index) => {
              return <option key={index} value={`${measure.uri},${measure.label}`} name={measure.label} >{measure.label}</option>;
            })}
          </select>
          <br />
          <Button type='submit'>Submit</Button>
        </form>
      );
    }}

  generateResults = () => {
    return this.state.results.map((item, key) => {
      return (
        <div className='ingredientResult' key={key} onClick={() => this.handleClickIngredient(item)}>
          <span>{item.name}</span>
        </div>
      );
    });
  }

  handleClickIngredient = (item) => {
    this.setState({
      chosenIngredient: item,
      results: []
    });
  }

  render() {
    if (!this.state.chosenIngredient) {
      if(this.context.loading){
        return (<div className="center"><Loading /></div>);
      }
      else {
        return (
          <div className="formContainer">
            <form
              className='mealForm'
              onSubmit={this.handleSubmit}
            >
              <Error />
              <div className='formField'>
                <label htmlFor='ingredient-input' className="inputLabel backgroundColor6 border3 textColor1">
                Ingredient: </label>
                <input ref={this.firstInput} id='ingredient-input' className="inputField border3 backgroundColor4" name='ingredient-input' value={this.state.ingredientInput} onChange={this.handleInput} required />
              </ div>
              <br />
              <Button type='submit'>
                Search Ingredients
              </Button>
            </form>
            {(this.state.hasResults === false) && <div className='center' style={{cursor: 'default'}}><h4> No Results </h4></div>}

            <section className="results">
              {(this.state.results.length >= 1) && <h4>Pick One:</h4>}
              <br />
              {(this.state.results.length >= 1) && this.generateResults()}
            </section>
          </ div>  
        );
      }
    }
    else {
      return (
        this.generateMeasureForm()
      );
    }
  }
}

AddIngredient.defaultProps = {
  handleModal: () => null
}; 