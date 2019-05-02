import React, { Component } from 'react';
import AddIngredient from '../AddIngredient/AddIngredient';
import UserContext from '../../contexts/UserContext';
import MealsApiService from '../../services/meals-api-service';

export default class LogSnack extends Component {
  static contextType = UserContext;

  getSelectedDateTime(meal) {
    let month = document.getElementById('userMon');
    let day = document.getElementById('userDay');
    let year = document.getElementById('userYear');
    let hour = document.getElementById('userHour');
    let mins = document.getElementById('userMins');
    let ampm = document.getElementById('userAMPM');
    
    if (hour.value !== '12') {
      if (ampm.value === 'AM') {
        hour = hour.value;
      }
      if (ampm.value === 'PM') {
        hour = Number(hour.value) + 12;
      }
    }

    if (hour.value === '12') {
      if (ampm.value === 'AM') {
        hour = '00';
      }
      if (ampm.value === 'PM') {
        hour = '12';
      }
    }
    let date = `${year.value}-${month.value}-${day.value} ${hour}:${mins.value}:00`;
    console.log(
      `>>>>>>>>>>>>>>>>>>>
      date ${date}
      meal ${meal}`
    )
    MealsApiService.logFood(meal, date, 'snack');
  }

  render() {

    if (this.context.ingredient.name) {
      return (<>
        <h3>when did you eat the {this.context.ingredient.name}?</h3>
        <form>
          <label htmlFor="userDate">Date</label>
          <section id="userDate">
            <select id="userMon">
              <option value="01">Jan</option>
              <option value="02">Feb</option>
              <option value="03">Mar</option>
              <option value="04">Apr</option>
              <option value="05">May</option>
              <option value="06">Jun</option>
              <option value="07">Jul</option>
              <option value="08">Aug</option>
              <option value="09">Sep</option>
              <option value="10">Oct</option>
              <option value="11">Nov</option>
              <option value="12">Dec</option>
            </select>
            <select id="userDay">
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="16">16</option>
              <option value="17">17</option>
              <option value="18">18</option>
              <option value="19">19</option>
              <option value="20">20</option>
              <option value="21">21</option>
              <option value="22">22</option>
              <option value="23">23</option>
              <option value="24">24</option>
              <option value="25">25</option>
              <option value="26">26</option>
              <option value="27">27</option>
              <option value="28">28</option>
              <option value="29">29</option>
              <option value="30">30</option>
              <option value="31">31</option>
            </select>
            <select id="userYear">
              <option value="2019">2019</option>
            </select>
          </section>
          <br />
          <label htmlFor="userTime">Time</label>
          <section id="userTime">
            <select id="userHour">
              <option value="01">1</option>
              <option value="02">2</option>
              <option value="03">3</option>
              <option value="04">4</option>
              <option value="05">5</option>
              <option value="06">6</option>
              <option value="07">7</option>
              <option value="08">8</option>
              <option value="09">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
            </select>
            <select id="userMins">
              <option value="00">00</option>
              <option value="15">15</option>
              <option value="30">30</option>
              <option value="45">45</option>
            </select>
            <select id="userAMPM">
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </section>
          <button onClick={() => this.getSelectedDateTime(this.context.ingredient)}>Log Your Snack!</button>
        </form>
        </>
      )
    }

    return (
      <div>
        <h3>Log a Single Item Snack!</h3>
        <AddIngredient />
      </div>
    );
  }
}