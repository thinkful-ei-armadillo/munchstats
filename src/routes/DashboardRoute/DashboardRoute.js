import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';
import CalorieChart1 from '../../components/CalorieChart1/CalorieChart1'
import Button from '../../components/Button/Button'

class DashboardRoute extends Component {
  render() {
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
        <CalorieChart1 className = 'dashboardChart' />
        <Link className = 'chartLink' to='/charts'>
            View Your Charts
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;