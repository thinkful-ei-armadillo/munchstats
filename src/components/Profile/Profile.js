import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import Back from '../../components/Back/Back';
import './Profile.css';

export default class Profile extends Component {
  static contextType = UserContext;

  state = {
    isEditing: false
  };

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
    if(isDark) {
      document.documentElement.setAttribute('theme', 'dark');
    }
    else {
      document.documentElement.setAttribute('theme', 'light');
    }
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
    this.setState({isEditing: false});
  }

  renderCheckbox = () => {
    if(this.context.user.isDark !== undefined){
      return (<label className="switch">
        <p>
          Dark Mode
        </p>
        <input type="checkbox" id="modeToggle" onChange={this.handleModeToggle} checked = {this.context.user.isDark}/>
        <span className="slider round"></span>
      </label>);
    } else return (
      <></>
    );
  }

  // CHECK THIS TO MAKE SURE IT DIDNT BREAK
  genEditForm(){
    if(this.state.isEditing === true){
      return(
        <div className="formContainer" id="budgetForm">
          <form>
            <div className="formField">
              <label htmlFor='calorieBudget' className="inputLabel backgroundColor6 border3 textColor3" >Calorie Budget</label>                
              <input type="text" id="calorieBudget" className="inputField border3 backgroundColor4" defaultValue={this.context.user.calorieBudget} />
            </div>
            <div className="formField">
              <label htmlFor='fatBudget' className="inputLabel backgroundColor6 border3 textColor3" >Fat Budget</label>
              <input type="text" id="fatBudget" className="inputField border3 backgroundColor4" defaultValue={this.context.user.fatBudget} />
            </div>
            <div className="formField">
              <label htmlFor='carbBudget' className="inputLabel backgroundColor6 border3 textColor3" >Carb Budget</label>
              <input type="text" id="carbBudget" className="inputField border3 backgroundColor4" defaultValue={this.context.user.carbBudget} />
            </div>
            <div className="formField">
              <label htmlFor='proteinBudget' className="inputLabel backgroundColor6 border3 textColor3" >Protein Budget</label>
              <input type="text" id="proteinBudget" className="inputField border3 backgroundColor4" defaultValue={this.context.user.proteinBudget} />
            </div>
            <br />
            <Button type="button" onClick={this.submitUserBudgets}>Submit</Button>
          </form>
        </div>
      ); 
    }
  }

  toggleEdit = () => {
    this.setState({isEditing: true});
    this.genEditForm();
  }

  render() {
    return (
      <>
        <Back history={this.props.history} />
        <h2>Hello, {this.context.user.name}!</h2>
        {this.renderCheckbox()}
        <section className="currBudgets">
          <b>Current Budgets</b>
          <br />
          Calories: {this.context.user.calorieBudget}
          <br />
          Fat: {this.context.user.fatBudget}
          <br />
          Carbs: {this.context.user.carbBudget}
          <br />
          Protein: {this.context.user.proteinBudget}
        </section>
        {(this.state.isEditing) ? null : <Button type="button" onClick={this.toggleEdit}>Edit Budgets</Button>}
        {this.genEditForm()}
      </>
    );
  }
}