import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';
import CalorieChart1 from '../../components/CalorieChart1/CalorieChart1'
import Button from '../../components/Button/Button'
import UserContext from '../../contexts/UserContext';

class DashboardRoute extends Component {

  static contextType = UserContext
  render() {

    let chartData = [[0], [0]];
    if (this.context.todayEvents) {
      chartData[1][0] = this.context.user.calorieBudget;
      for (let i = 0; i < this.context.todayEvents.length; i++) {
        chartData[0][0] += this.context.todayEvents[i].calories;
      }
    }
    if (!chartData[0][0] && !chartData[1][0]) {
      chartData = null
    }
    return (
      <section className="dashboard">
        <h2>Dashboard</h2>
        <Link to='/meals' >
          <Button className = 'dashboardButton'>
              Create, View, or Edit Your Meals
          </Button>
        </Link>
        <Link to='/log' >
          <Button className = 'dashboardButton'>
              Log a Meal or Snack
          </Button>
        </Link>
        <CalorieChart1 chartData={chartData} className = 'dashboardChart' />
        {(chartData && this.context.user.calorieBudget) ? 
          <Link className = 'chartLink textColor1' to='/charts'>
              View Your Charts
          </Link> : null
        }
      </section>
    );
  }
}

export default DashboardRoute;