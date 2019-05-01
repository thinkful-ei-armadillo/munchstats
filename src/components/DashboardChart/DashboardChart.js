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
        type: "line",
        data: {
            //Bring in data
            labels: ["Jan", "Feb", "March"],
            datasets: [{
                label: "Sales",
                data: [86, 67, 91],
            }]
        },
        options: {
            //Customize chart options
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