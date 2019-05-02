import React, { Component } from 'react';
// import './App.css';
import Chart from 'chart.js';
import EventsApiService from '../../services/events-api-service'
import UserContext from '../../contexts/UserContext'

export default class DashboardChart extends Component {

static contextType = UserContext;

chartRef = React.createRef();

componentDidMount() {
    this.context.clearError();
    console.log(this.context)

    // const chartData = [0, 0, 0, 0];
    // for(let i = 0; i < this.context.todayEvents.length; i++) {
    //     chartData[0] += this.context.todayEvents[i].calories;
    //     chartData[1] += this.context.todayEvents[i].carbs;
    //     chartData[2] += this.context.todayEvents[i].fat;
    //     chartData[3] += this.context.todayEvents[i].protein;
    // }
    // console.log(chartData);
    // const myChartRef = this.chartRef.current.getContext("2d");

    // new Chart(myChartRef, {
    //     type: 'bar',
    //     data: {
    //         labels: ['Calories', 'Carbs', 'Fat', 'Protein'],
    //         datasets: [{
    //             label: "Today's Nutrition",
    //             data: chartData,
    //             backgroundColor: [
    //                 'rgba(255, 99, 132, 0.2)',
    //                 'rgba(54, 162, 235, 0.2)',
    //                 'rgba(255, 206, 86, 0.2)',
    //                 'rgba(75, 192, 192, 0.2)'
    //             ],
    //             borderColor: [
    //                 'rgba(255, 99, 132, 1)',
    //                 'rgba(54, 162, 235, 1)',
    //                 'rgba(255, 206, 86, 1)',
    //                 'rgba(75, 192, 192, 1)'
    //             ],
    //             borderWidth: 1
    //         }]
    //     },
    //     options: {
    //         scales: {
    //             yAxes: [{
    //                 ticks: {
    //                     beginAtZero: true
    //                 }
    //             }]
    //         }
    //     }
    // });

    }

  render() {
    return (
    <div className="dashboardChart">
        <canvas id="myChart" ref={this.chartRef} />
    </div>
    );
  }
}