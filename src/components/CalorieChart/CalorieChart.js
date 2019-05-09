import React, { Component } from 'react';
import Chart from 'chart.js';
import UserContext from '../../contexts/UserContext';

export default class CalorieChart extends Component {

static contextType = UserContext;

chartRef = React.createRef();

componentDidMount() {
  this.context.clearError();
  // create the array that we will use for the chart
  let chartData = [0, 0];
  // populates the first index in the array with the user's calorie budget
  chartData[1] = this.context.user.calorieBudget;
  // populates the second index with the total calories from each event via for loop
  for(let i = 0; i < this.context.todayEvents.length; i++) {
    chartData[0] += this.context.todayEvents[i].calories;
  }
  const myChartRef = this.chartRef.current.getContext('2d');

  // creating the chart
  new Chart(myChartRef, {
    type: 'horizontalBar',
    data: {
      labels: ['Calories', 'Calorie Goal'],
      datasets: [{
        label: 'Today\'s Calories',
        data: chartData,
        backgroundColor: [
          // both set to red
          'rgba(255, 99, 132, 0.5)',
          'rgba(255, 99, 132, 0.5)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(255, 99, 132, 1)'
        ],
        borderWidth: 1
      }]
    },
    options: {
      legend: {
        // hides the legend input since we use headers to label the chart
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true,
            fontColor:'#eee'
          }
        }],
        yAxes: [{
          // setting the bar's thickness and creating a max case
          barThickness: 80,
          maxBarThickness: 100,
          ticks: {
            fontColor: '#eee'
          }
        }]
      }
    }
  });

}

render() {
  return (
    <div className="calorieChart">
      <canvas id="myChart" className="shadow backgroundColor5" ref={this.chartRef} />
    </div>
  );
}
}