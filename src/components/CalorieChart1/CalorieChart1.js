import React, { Component } from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import UserContext from '../../contexts/UserContext';
import EventsApiService from '../../services/events-api-service';
import moment from 'moment';

export default class CalorieChart extends Component {

static contextType = UserContext;

componentDidMount() {
  this.context.clearError();
  if(document.documentElement.getAttribute('theme') === 'dark'){ //dynamic text color here
    //dark mode
  }
  else {
    //light mode
  }
}

render() {

  let chartData = [[0], [0]];
  if(this.props.chartData){
    chartData[1][0] = this.context.user.calorieBudget * this.props.days;
    for (let i = 0; i < this.props.chartData.length; i++) {
      chartData[0][0] += this.props.chartData[i].calories;
      }
  }else {
    if (this.context.todayEvents) {
      chartData[1][0] = this.context.user.calorieBudget;
      for (let i = 0; i < this.context.todayEvents.length; i++) {
        chartData[0][0] += this.context.todayEvents[i].calories;
      }
    }
  }
    
  return (
    <div className="calorieChart shadow backgroundColor5">
      <HorizontalBar className = 'textColor2' options = {{
        scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
          }
        }],
        yAxes: [{
          barThickness: 80,
          maxBarThickness: 100,
          ticks: {
          }
        }]
      }
      }} data={ {
        labels: ['Calories'],
        datasets: [{
          label: 'Current',
          data: chartData[0],
          backgroundColor: [
            'rgba(255, 206, 86, 0.5)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
          ],
          borderWidth: 1
          },
          {
          label: 'Goals',
          data: chartData[1],
          backgroundColor: [
            'rgba(0, 180, 175, 0.5)',
          ],
          borderColor: [
            'rgba(0, 180, 175, 1)',
          ],
          borderWidth: 1
          }
        ]
       } } />
      {/* <canvas id="myChart" className="shadow backgroundColor5" ref={this.chartRef} /> */}
    </div>
  );
}
}