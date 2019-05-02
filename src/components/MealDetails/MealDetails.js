import React, { Component } from 'react';
import './MealDetails.css';
import MealsApiService from '../../services/meals-api-service';
import IngredientsApiService from '../../services/ingredients-api-service';
import AddIngredient from '../AddIngredient/AddIngredient';
import UserContext from '../../contexts/UserContext';
import ReactModal from 'react-modal'

export default class Meals extends Component {
  state = {
    ingredientInput: '',
    results: [],
    chosenIngredient: '',
    finalIngredients: [],
    mealInfo: {},
    mealIngredients: [],
    showModal: false
  };

  static contextType = UserContext;
  
  componentDidMount() {
    this.getMealInfo();
    this.getMealIngredients();
    ReactModal.setAppElement('body');
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

  getMealIngredients() {
      return IngredientsApiService.getIngredientsForMeal(this.props.meal_id)
      .then(res => this.setState({ mealIngredients: res.ingredients }))
      .catch(err => console.log(err));
  }

  updateMeal(res) {
    //check if ingredient exists in context before calling this function
    let results = {
      ingredient: {
        meal_id: Number(this.props.meal_id), 
        name: res.name,
        total_calorie: Math.round(res.total_calorie),
        total_fat: Math.round(res.total_fat),
        total_carbs: Math.round(res.total_carbs),
        total_protein: Math.round(res.total_protein),
        amount: Number(res.quantity),
        unit: res.unit
      }
    };
    this.context.clearIngredient();

    IngredientsApiService.addIngredient(this.props.meal_id, results)
      .then(() => {
        // add calorie/fat/carb/protein counts to meal totals
        const newMealStats = {
          total_calorie: Number(this.state.mealInfo.total_calorie) + Number(results.ingredient.total_calorie),
          total_fat: Number(this.state.mealInfo.total_fat) + Number(results.ingredient.total_fat),
          total_carbs: Number(this.state.mealInfo.total_carbs) + Number(results.ingredient.total_carbs),
          total_protein: Number(this.state.mealInfo.total_protein) + Number(results.ingredient.total_protein)
        };
        const patchedMeal = { 'meal': { ...this.state.mealInfo, ...newMealStats } };

        MealsApiService.updateMeal(patchedMeal)
          .then(() => {
            this.getMealInfo();
            this.getMealIngredients();

          });
      });

  }

  renderMealStats() {
    return <>
      <h3 className = 'panelHeader'>Meal Nutrition Information</h3>
      <div className='nutritionInfo' >
        <p>calories: {Math.round(this.state.mealInfo.total_calorie)}</p>
        <p> fat: {Math.round(this.state.mealInfo.total_fat)} </p>
        <p>carbs: {Math.round(this.state.mealInfo.total_carbs)} </p>
        <p>protein: {Math.round(this.state.mealInfo.total_protein)}</p>
      </div>
    </>
  }

  generateFinalIngredients = () => {
    return this.state.mealIngredients.map((item, key) => <div className = 'ingredient' key={key}>
      <span>
        {item.name} | {item.amount} {item.unit}
      </span>
      <span onClick={() => this.handleClickDelete(item)}><i className="fas fa-trash"></i></span>
    </div>
    );
  }

  handleClickDelete = (ingredient) => {
    IngredientsApiService.deleteIngredient(ingredient.id)
      .then(() => {
        // subtract calorie/fat/carb/protein counts to meal totals
        const newMealStats = {
          total_calorie: Number(this.state.mealInfo.total_calorie) - Number(ingredient.total_calorie),
          total_fat: Number(this.state.mealInfo.total_fat) - Number(ingredient.total_fat),
          total_carbs: Number(this.state.mealInfo.total_carbs) - Number(ingredient.total_carbs),
          total_protein: Number(this.state.mealInfo.total_protein) - Number(ingredient.total_protein)
        };
        const patchedMeal = { 'meal': { ...this.state.mealInfo, ...newMealStats } };
        MealsApiService.updateMeal(patchedMeal)
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

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  
  componentWillUnmount() {
    this.context.clearIngredient();
  }

  render() {
    
    if(this.context.ingredient.name){
      this.updateMeal(this.context.ingredient)
    }

    return (
      <>
        
        <h3 className='mealName'>{this.state.mealInfo ? this.state.mealInfo.name : ''}</h3>

        <div className='mealContainer'>
          
          {/* <div className='addIngredientContainer'>
            <h3>Add an ingredient to your meal</h3>
            <AddIngredient/>
          </div> */}
          
            <section className='finalIngredientsContainer'>
              <div className = 'panel'>
                <div className = 'panelHeader'>
                  <h3>Meal Ingredients</h3>
                  <p className = 'modalOpener' onClick={this.handleModal}>click here to add ingredient</p>
                </div>
                <div className="finalIngredients">
                  {(this.state.mealIngredients[0]) ? this.generateFinalIngredients() : 'Nothing so far!'}
                  <ReactModal
                    isOpen={this.state.showModal}
                    onRequestClose={this.handleModal}
                    contentLabel="Minimal Modal Example"
                    className='modal'
                  > 
                    <div className = 'modalAddIngredient panel'>
                      <h3 className = 'panelHeader'>Search For an Ingredient</h3>
                      <AddIngredient handleModal={this.handleModal} />
                    </div>
                    <i onClick={this.handleModal} className="fas fa-times modalCloser"></i>
                  </ReactModal>
                </div>
              </div>
            </section>

            <section className='currentMealStats'>
              <div className = 'panel'>
                {this.renderMealStats()}
              </div>
            </section>
          
        </div>
      </>
    );
  }
}