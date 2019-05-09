import React, { Component } from 'react';
import { Bar } from 'react-chartjs-2';
import UserContext from '../../contexts/UserContext';

export default class GramChart extends Component {

static contextType = UserContext;

componentDidMount() {
  this.context.clearError();
}  

render() {

  let chartData = [[0], [0], [0], [0], [0], [0]];
  if (this.props.chartData) {
    chartData[1][0] = this.context.user.carbBudget * this.props.days;
    chartData[3][0] = this.context.user.fatBudget * this.props.days;
    chartData[5][0] = this.context.user.proteinBudget * this.props.days;
    for (let i = 0; i < this.props.chartData.length; i++) {
      chartData[0][0] += this.props.chartData[i].carbs;
      chartData[2][0] += this.props.chartData[i].fat;
      chartData[4][0] += this.props.chartData[i].protein;
    }
    console.log(this.props.chartData)
  } else {   
      chartData[1][0] = this.context.user.carbBudget;
      chartData[3][0] = this.context.user.fatBudget;
      chartData[5][0] = this.context.user.proteinBudget;
      for (let i = 0; i < this.context.todayEvents.length; i++) {
        chartData[0][0] += this.context.todayEvents[i].carbs;
        chartData[2][0] += this.context.todayEvents[i].fat;
        chartData[4][0] += this.context.todayEvents[i].protein;
      }
  }

  
  return (
    <div className="gramChart shadow backgroundColor5">
      <Bar options={{
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
              beginAtZero: true,
            }
          }]
        }
      }} data={{
      labels: ['Carbs', 'Fat', 'Protein'],
        datasets: [{
          label: 'Current',
          data: [chartData[0], chartData[2], chartData[4]],
          backgroundColor: [
            'rgba(222, 130, 50, 0.5)',
            'rgba(238, 105, 189, 0.5)',
            'rgba(255, 99, 132, 0.5)'
          ],
          borderColor: [
            'rgba(222, 130, 50, 1)',
            'rgba(238, 105, 189, 1)',
            'rgba(255, 99, 132, 1)'
          ],
          borderWidth: 1
        },
        {
          label: 'Goals',
          data: [chartData[1], chartData[3], chartData[5]],
          backgroundColor: [
            'rgba(0, 180, 175, 0.5)',
            'rgba(0, 180, 175, 0.5)',
            'rgba(0, 180, 175, 0.5)',
          ],
          borderColor: [
            'rgba(0, 180, 175, 0.5)',
            'rgba(0, 180, 175, 0.5)',
            'rgba(0, 180, 175, 0.5)',
          ],
          borderWidth: 1
        }
      ]
    }} />
    </div>
  );
}
}