import React, { Component } from 'react';
import Chart from 'chart.js';
import UserContext from '../../contexts/UserContext';

export default class CalorieChart extends Component {

static contextType = UserContext;

chartRef = React.createRef();

componentDidMount() {
  this.context.clearError();
  let chartData = [0, 0];
  chartData[1] = this.context.user.calorieBudget;
  for(let i = 0; i < this.context.todayEvents.length; i++) {
    chartData[0] += this.context.todayEvents[i].calories;
  }
  const myChartRef = this.chartRef.current.getContext('2d');

  new Chart(myChartRef, {
    type: 'horizontalBar',
    data: {
      labels: ['Calories', 'Calorie Goal'],
      datasets: [{
        label: 'Today\'s Calories',
        data: chartData,
        backgroundColor: [
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
        display: false
      },
      scales: {
        xAxes: [{
          ticks: {
            beginAtZero: true
          }
        }],
        yAxes: [{
          barThickness: 80,
          maxBarThickness: 100
        }]
      }
    }
  });

}

render() {
  return (
    <div className="calorieChart">
      <canvas id="myChart" className="shadow" ref={this.chartRef} />
    </div>
  );
}
}