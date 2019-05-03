import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
import AuthApiService from '../../services/auth-api-service';
import './Profile.css';

export default class Profile extends Component {
  static contextType = UserContext;

  state = {

  };

  handleModeToggle(){
    const checkbox = document.getElementById("modeToggle");
    if(checkbox.checked === true){
      // require dark mode
    }
    else{
      // require light mode
    }
  }

  submitUserBudgets = () => {
    // TODO: refactor this atrocity
    let calorieBudget = null;
    if(this.context.user.calorieBudget === null || !this.context.user.calorieBudget){
      calorieBudget = Number(document.getElementById("calorieBudget").value);
    }
    if(this.context.user.calorieBudget !== null && Number(document.getElementById("calorieBudget").value) !== 0){
      calorieBudget = Number(document.getElementById("calorieBudget").value);
    }
    if(this.context.user.calorieBudget !== null && Number(document.getElementById("calorieBudget").value) === 0){
      calorieBudget = this.context.user.calorieBudget;
    }
    if(!this.context.user.calorieBudget && Number(document.getElementById("calorieBudget").value) === 0){
      calorieBudget = null;
    }

    let fatBudget = null;
    if(this.context.user.fatBudget === null || !this.context.user.fatBudget){
      fatBudget = Number(document.getElementById("fatBudget").value);
    }
    if(this.context.user.fatBudget !== null && Number(document.getElementById("fatBudget").value) !== 0){
      fatBudget = Number(document.getElementById("fatBudget").value);
    }
    if(this.context.user.fatBudget !== null && Number(document.getElementById("fatBudget").value) === 0){
      fatBudget = this.context.user.fatBudget;
    }
    if(!this.context.user.fatBudget && Number(document.getElementById("fatBudget").value) === 0){
      fatBudget = null;
    }

    let carbBudget = null;
    if(this.context.user.carbBudget === null || !this.context.user.carbBudget){
      carbBudget = Number(document.getElementById("carbBudget").value);
    }
    if(this.context.user.carbBudget !== null && Number(document.getElementById("carbBudget").value) !== 0){
      carbBudget = Number(document.getElementById("carbBudget").value);
    }
    if(this.context.user.carbBudget !== null && Number(document.getElementById("carbBudget").value) === 0){
      carbBudget = this.context.user.carbBudget;
    }
    if(!this.context.user.carbBudget && Number(document.getElementById("carbBudget").value) === 0){
      carbBudget = null;
    }

    let proteinBudget = null;
    if(this.context.user.proteinBudget === null || !this.context.user.proteinBudget){
      proteinBudget = Number(document.getElementById("proteinBudget").value);
    }
    if(this.context.user.proteinBudget !== null && Number(document.getElementById("proteinBudget").value) !== 0){
      proteinBudget = Number(document.getElementById("proteinBudget").value);
    }
    if(this.context.user.proteinBudget !== null && Number(document.getElementById("proteinBudget").value) === 0){
      proteinBudget = this.context.user.proteinBudget;
    }
    if(!this.context.user.proteinBudget && Number(document.getElementById("proteinBudget").value) === 0){
      proteinBudget = null;
    }

    this.context.setUser({
      ...this.context.user,
      calorieBudget,
      fatBudget,
      carbBudget,
      proteinBudget
    })

    // AuthApiService.patchUser(this.context.user);
  }

  render() { 
    return (
      <>
        <h2>Hello, {this.context.user.name}!</h2>
        Dark Mode
        <label className="switch">
          <input type="checkbox" id="modeToggle" onClick={this.handleModeToggle} />
          <span className="slider round"></span>
        </label>
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