import React, { Component } from 'react';
import './MealDetails.css';
import MealsApiService from '../../services/meals-api-service';
import IngredientsApiService from '../../services/ingredients-api-service';
import AddIngredient from '../AddIngredient/AddIngredient';
import UserContext from '../../contexts/UserContext';
import ReactModal from 'react-modal';
import Loading from '../../components/Loading/Loading';
import Back from '../../components/Back/Back';
import Error from '../../components/Error/Error';

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
    this.context.loadingTrue();
    this.context.clearError();
    return MealsApiService.getMealById(this.props.meal_id)
      .then(res => {
        if (res.length === 0) {
          this.props.history.push('/nothinghere');
        } else {
          // hacky fix to avoid react trying to set state on unmounted component
          if (res.length !== 0) {
            this.setState({ mealInfo: res[0] });
            this.context.loadingFalse();
          }
        }
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse(); 
      });  
  }

  getMealIngredients() {
    this.context.loadingTrue();
    this.context.clearError();
    return IngredientsApiService.getIngredientsForMeal(this.props.meal_id)
      .then(res => {
        this.setState({ mealIngredients: res.ingredients });
        this.loadingFalse();
      })
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse(); 
      });  }

  updateMeal(res) {
    this.context.loadingTrue();
    this.context.clearError();
    let results = {
      ingredient: {
        meal_id: Number(this.props.meal_id), 
        name: res.name,
        total_calorie: Math.round(res.total_calorie),
        total_fat: Math.round(res.total_fat),
        total_carbs: Math.round(res.total_carbs),
        total_protein: Math.round(res.total_protein),
        amount: Number(res.amount),
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
          })
          .catch(e => {
            this.context.setError(e);
            this.context.loadingFalse(); 
          });
      });
  }

  renderMealStats() {
    return <>
      <h3 className = 'panelHeader backgroundColor2 textColor2'>Meal Nutrition Information</h3>
      <div className='nutritionInfo' >
        <p className="mealNutrientStats">calories: {Math.round(this.state.mealInfo.total_calorie)}</p>
        <p className="mealNutrientStats"> fat: {Math.round(this.state.mealInfo.total_fat)} </p>
        <p className="mealNutrientStats">carbs: {Math.round(this.state.mealInfo.total_carbs)} </p>
        <p className="mealNutrientStats">protein: {Math.round(this.state.mealInfo.total_protein)}</p>
      </div>
    </>;
  }

  generateFinalIngredients = () => {
    return this.state.mealIngredients.map((item, key) => <div className = 'ingredient gradientUnderline1' key={key}>
      <span>
        {item.name} | {item.amount} {item.unit}
      </span>
      <span onClick={() => this.handleClickDelete(item)}><i className="fas fa-trash"></i></span>
    </div>
    );
  }

  handleClickDelete = (ingredient) => {
    this.context.loadingTrue();
    this.context.clearError();
    
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
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse(); 
      });
  }

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  generateModal = () => {
    if(this.state.showModal){
      return (
        <ReactModal
          isOpen={this.state.showModal}
          onRequestClose={this.handleModal}
          contentLabel="Add Ingredient"
          className='modal modalAddIngredient panel backgroundColor5 shadow'
        > 
          <h3 className = 'panelHeader backgroundColor2 textColor2'>Search For an Ingredient</h3>
          <AddIngredient handleModal={this.handleModal} history = {this.props.history} />
          <i onClick={this.handleModal} className="fas fa-times modalCloser textColor4"></i>
        </ReactModal>
      );
    }
    else {
      return (
        <>
        </>
      );
    }
  }

  
  componentWillUnmount() {
    this.context.clearIngredient();
  }

  render() {
    
    if(this.context.ingredient.name){
      this.updateMeal(this.context.ingredient);
    }

    if(!this.state.showModal && this.context.loading){
      return <div className="center"><Loading/></div>;
    }
    else {

      return (
      <>
        <Back history={this.props.history} path={'/meals'} />
        <Error />   
        <h3 className='mealName'>{this.state.mealInfo ? this.state.mealInfo.name : ''}</h3>

        <div className='mealContainer'>          
          <section className='finalIngredientsContainer'>
            <div className= 'panel backgroundColor7 shadow textColor1 deatailsPanel'>
              <div className= 'panelHeader backgroundColor2 textColor2 '>
                <h3>Meal Ingredients</h3>
                <p className = 'modalOpener' onClick={this.handleModal}>Add Ingredient</p>
              </div>
              <div className="finalIngredients">
                {(this.state.mealIngredients[0]) ? this.generateFinalIngredients() : 'Nothing so far!'}
                {this.generateModal()}
              </div>
            </div>
          </section>
          <section className='currentMealStats'>
            <div className= 'panel deatailsPanel backgroundColor7 shadow textColor1'>
              {this.renderMealStats()}
            </div>
          </section>
        </div>
      </>
      );
    }
  }
}