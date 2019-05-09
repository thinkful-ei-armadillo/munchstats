import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import MealsApiService from '../../services/meals-api-service';
import { Link } from 'react-router-dom';
import './Meals.css';
import Loading from '../Loading/Loading';
import Error from '../Error/Error';
import ReactModal from 'react-modal';
import Back from '../Back/Back';

export default class Meals extends Component {
  static contextType = UserContext;

  state = {
    mealInput: '',
    meals: [],
    showModal: false
  };

  handleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  componentDidMount() {
    this.context.clearError();
    this.context.loadingTrue();
    ReactModal.setAppElement('body'); 
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
    this.context.clearError();
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
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });
  }

  handleCreationSuccess = (id) => {
    const history = this.props.history;
    history.push(`/meals/${id}`);
  }

  handleClickDelete = (meal) => {
    this.context.loadingTrue();
    this.context.clearError();
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
      <>
        <ul className='MealsPage__meals'>
          {meals.map(meal =>
            <li key={meal.id} className='MealsPage_meals_li backgroundColor4 textColor3 shadow'>
              <h3 className = 'mealPageMealName'>{meal.name}</h3> 
              <div className = "mealNav backgroundColor2">
                <Button onClick={() => this.handleClickDelete(meal)}><i className="fas fa-trash mealControl" /></Button>
                <Link
                  to={`/meals/${meal.id}`}
                  style={{textDecoration: 'none'}}>
                  <Button type="button" className='editMeal'>
                    <i className="fas fa-pen mealControl"></i>
                  </Button>
                </Link>
              </div>
            </li>
          )}
        </ul>
      </>
    );
  }
  
  render() {
    if(this.context.loading){
      return <div className="center"><Loading/></div>;
    }
    else {
      return (
        <div>
          <Error />
          <div className  = 'mealsHeader'>
            <h2>Your Meals</h2>
            <p className='modalOpener' onClick={this.handleModal}>Add Meal</p>
          </div>
          <ReactModal
            isOpen={this.state.showModal}
            onRequestClose={this.handleModal}
            contentLabel="Add Meal"
            className='panel mealModal backgroundColor5 shadow'>
            <form
              className='mealCreationForm'
              onSubmit={this.handleSubmit}>
        
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
            <i onClick={this.handleModal} className="fas fa-times modalCloser"></i>
          </ReactModal>
          <section className="mealsContainer">
            {this.context.meals.meal ? this.genUserMeals(this.context.meals.meal) : null}
          </section>
        </div>
      );
    }
  }
}