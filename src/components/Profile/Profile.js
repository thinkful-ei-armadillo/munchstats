import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Back from '../../components/Back/Back';
import './Profile.css';

export default class Profile extends Component {
  static contextType = UserContext;

  componentDidMount(){
    AuthApiService.getUserBudgets()
      .then(res => {
        this.context.setUser({
          ...this.context.user,
          ...res.user[0]
        });
      });
  }
  

  handleModeToggle = () => {
    let isDark = !this.context.user.isDark;    
    this.context.setUser({
      ...this.context.user,
      isDark
    });

    AuthApiService.patchUserDark(this.context.user);
  }

  setUserBudgets(budget){
    let newBudget = null;
    if(this.context.user[budget] === null || !this.context.user[budget]){
      newBudget = Number(document.getElementById(`${budget}`).value);
    }
    if(this.context.user[budget] !== null && Number(document.getElementById(`${budget}`).value) !== 0){
      newBudget = Number(document.getElementById(`${budget}`).value);
    }
    if(this.context.user[budget] !== null && Number(document.getElementById(`${budget}`).value) === 0){
      newBudget = this.context.user[budget];
    }
    if(!this.context.user[budget] && Number(document.getElementById(`${budget}`).value) === 0){
      newBudget = null;
    }
    document.getElementById(`${budget}`).value = '';
    return newBudget;
  }

  submitUserBudgets = () => {
    let calorieBudget = this.setUserBudgets('calorieBudget');
    let fatBudget = this.setUserBudgets('fatBudget');
    let carbBudget = this.setUserBudgets('carbBudget');
    let proteinBudget = this.setUserBudgets('proteinBudget');

    this.context.setUser();
    let updatedUser = {
      ...this.context.user,
      calorieBudget,
      fatBudget,
      carbBudget,
      proteinBudget
    };
    AuthApiService.patchUser(updatedUser)
      .then(this.context.setUser(updatedUser));
    
  }

  renderCheckbox = () => {
    if(this.context.user.isDark !== undefined){
      return (<label className="switch">
        <input type="checkbox" id="modeToggle" onChange={this.handleModeToggle} checked = {this.context.user.isDark}/>
        <span className="slider round"></span>
      </label>);
    } else return (
      <></>
    );
  }

  render() {
    return (
      <>
        <Back history={this.props.history} path={'/'} />
        <h2>Hello, {this.context.user.name}!</h2>
        Dark Mode
        {this.renderCheckbox()}
        <section>
          Current Budgets
          <br />
          Calories: {this.context.user.calorieBudget}
          <br />
          Fat: {this.context.user.fatBudget}
          <br />
          Carbs: {this.context.user.carbBudget}
          <br />
          Protein: {this.context.user.proteinBudget}
        </section>
        <form className="userBudgets">
          <label>
            Calorie Budget: <input type="text" id="calorieBudget" />
          </label>
          <br />
          <label>
            Fat Budget: <input type="text" id="fatBudget" />
          </label>
          <br />
          <label>
            Carb Budget: <input type="text" id="carbBudget" />
          </label>
          <br />
          <label>
            Protein Budget: <input type="text" id="proteinBudget" />
          </label>
          <br />
          <Button type="button" onClick={this.submitUserBudgets}>Submit</Button>
        </form>
      </>
    );
  }
}