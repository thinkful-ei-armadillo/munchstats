import React, { Component } from 'react';
import Chart from 'chart.js';
import UserContext from '../../contexts/UserContext';

export default class GramChart extends Component {

static contextType = UserContext;

chartRef = React.createRef();

componentDidMount() {
  this.context.clearError();

  // creating the dataset for the chart
  let chartData = [0, 0, 0, 0, 0, 0];
  // setting every other index to the user's goals for carbs, fat, and protein
  chartData[1] = this.context.user.carbBudget;
  chartData[3] = this.context.user.fatBudget;
  chartData[5] = this.context.user.proteinBudget;
  // setting the 1st, 3rd, and 5th indecies to the user's consummed carbs, fat, and protein based on today's events
  for(let i = 0; i < this.context.todayEvents.length; i++) {
    chartData[0] += this.context.todayEvents[i].carbs;
    chartData[2] += this.context.todayEvents[i].fat;
    chartData[4] += this.context.todayEvents[i].protein;
  }
  const myChartRef = this.chartRef.current.getContext('2d');

  new Chart(myChartRef, {
    type: 'bar',
    data: {
      labels: ['Carbs', 'Carbs Goal', 'Fat', 'Fat Goal', 'Protein', 'Protein Goal'],
      datasets: [{
        label: 'Grams',
        data: chartData,
        backgroundColor: [
          // carbs bars set to green
          'rgba(54, 162, 235, 0.5)',
          'rgba(54, 162, 235, 0.5)',
          // fat bars set to orange
          'rgba(255, 206, 86, 0.5)',
          'rgba(255, 206, 86, 0.5)',
          // protein bars set to blue
          'rgba(75, 192, 192, 0.5)',
          'rgba(75, 192, 192, 0.5)'
        ],
        borderColor: [
          // carbs bars
          'rgba(54, 162, 235, 1)',
          'rgba(54, 162, 235, 1)',
          // fat bars
          'rgba(255, 206, 86, 1)',
          'rgba(255, 206, 86, 1)',
          // protein bars
          'rgba(75, 192, 192, 1)',
          'rgba(75, 192, 192, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
            // callback function to set a grams label to the Y-Axis
            callback: function (value, index, values) {
              return value + 'g';
            }
          }
        }],
        xAxes: [{
          // setting the bar thickness
          barThickness: 80,
          maxBarThickness: 100
        }]
      }
    }
  });

}

render() {
  return (
    <div className="gramChart">
      <canvas id="gChart" className="shadow backgroundColor5" ref={this.chartRef} />
    </div>
  );
}
}