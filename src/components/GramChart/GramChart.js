import React, { Component } from 'react';
import Chart from 'chart.js';
import UserContext from '../../contexts/UserContext'

export default class GramChart extends Component {

static contextType = UserContext;

chartRef = React.createRef();

componentDidMount() {
    this.context.clearError();

    let chartData = [0, 0, 0];
    for(let i = 0; i < this.context.todayEvents.length; i++) {
        chartData[0] += this.context.todayEvents[i].carbs;
        chartData[1] += this.context.todayEvents[i].fat;
        chartData[2] += this.context.todayEvents[i].protein;
    }
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
        type: 'bar',
        data: {
            labels: ['Carbs', 'Fat', 'Protein'],
            datasets: [{
                label: "Grams",
                data: chartData,
                backgroundColor: [
                    // 'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.5)',
                    'rgba(255, 206, 86, 0.5)',
                    'rgba(75, 192, 192, 0.5)'
                ],
                borderColor: [
                    // 'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
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
                        callback: function (value, index, values) {
                            return value + 'g';
                        }
                    }
                }],
                xAxes: [{
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
        <canvas id="gChart" ref={this.chartRef} />
    </div>
    );
  }
}