import React, { Component } from 'react';
// import './App.css';
import config from '../../config';
import Chart from 'chart.js';

export default class DashboardChart extends Component {

//   getMealsByDate(start, end){

//     fetch(`${config.API_ENDPOINT}/events/date`, {
//       method: 'POST',
//       body: JSON.stringify({
//         'start': start,
//         'end': end
//       }),
//       headers: {
//         'content-Type': 'application/json',
//       }
//     })
//       .then(res => res.json())
//       .then(results => {
//         const sortedEvents = this.sortEvents(results);
//         // either set state or context here
//         this.setState({ userEvents: sortedEvents });
//       })
//       .catch(err => console.log(err));
//   }
chartRef = React.createRef();
componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d");

    new Chart(myChartRef, {
        type: 'bar',
        data: {
            labels: ['Calories', 'Carbs', 'Fat', 'Protein'],
            datasets: [{
                label: "Today's Nutrition",
                data: [1000, 100, 12, 30],
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
    return (
    <div className="dashboardChart">
        <canvas id="myChart" ref={this.chartRef} />
    </div>
    );
  }
}