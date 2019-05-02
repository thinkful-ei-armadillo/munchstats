import React, { Component } from 'react';
import Button from '../Button/Button';
import UserContext from '../../contexts/UserContext';
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
    let calorieBudget = Number(document.getElementById("calorieBudget").value)
      ? Number(document.getElementById("calorieBudget").value)
      : null;
    let fatBudget = Number(document.getElementById("fatBudget").value)
      ? Number(document.getElementById("fatBudget").value)
      : null;
    let carbBudget = Number(document.getElementById("carbBudget").value)
      ? Number(document.getElementById("carbBudget").value)
      : null;
    let proteinBudget = Number(document.getElementById("proteinBudget").value)
      ? Number(document.getElementById("proteinBudget").value)
      : null;

    this.context.setUser({
      ...this.context.user,
      calorieBudget,
      fatBudget,
      carbBudget,
      proteinBudget
    })
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