import React, { Component } from 'react';
// import './App.css';
import Chart from 'chart.js';
import EventsApiService from '../../services/events-api-service'
import UserContext from '../../contexts/UserContext'

export default class DashboardChart extends Component {
    state = {
        ChartRef: this.chartRef.current.getContext("2d")
    }

static contextType = UserContext;

chartRef = React.createRef();

componentDidMount() {
    this.context.clearError();
    EventsApiService.getTodaysEvents()
    .then(resj => console.log(resj))
      .then(res => this.context.setTodayEvents(res))
      .catch(e => this.context.setError(e));

      this.buildChart(this.context.todayEvents);
      console.log(this.context.todayEvents);
}

buildChart = (array) => {
    console.log(array);
    const chartData = [0, 0, 0, 0];
    for(let i = 0; i < array.length; i++) {
        chartData[0] += array[i].calories;
        chartData[1] += array[i].carbs;
        chartData[2] += array[i].protein;
        chartData[3] += array[i].fat;
    }
    console.log(chartData);

    new Chart(this.state.ChartRef, {
        type: 'bar',
        data: {
            labels: ['Calories', 'Carbs', 'Fat', 'Protein'],
            datasets: [{
                label: "Today's Nutrition",
                data: chartData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });

    }

  render() {

    //   let x;
    //   if(!x) {
    //       x = new Chart
    //   }
    return (
    <div className="dashboardChart">
        <canvas id="myChart" ref={this.chartRef} />
    </div>
    );
  }
}