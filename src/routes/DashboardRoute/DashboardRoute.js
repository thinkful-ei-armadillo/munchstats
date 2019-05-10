import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';
import CalorieChart1 from '../../components/CalorieChart1/CalorieChart1'
import Button from '../../components/Button/Button'
import UserContext from '../../contexts/UserContext';

class DashboardRoute extends Component {

  static contextType = UserContext
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
        {(this.context.user.calorieBudget) ? 
          null : <div className = 'updateBudgets'><h3>No chart data!</h3>Be sure to <Link to='/profile'>set your nutrition budgets</Link>.</div>
        }
        <CalorieChart1 className = 'dashboardChart' />
        
          <Link className = 'chartLink textColor1' to='/charts'>
              View Your Charts
          </Link>
        
      </section>
    );
  }
}

export default DashboardRoute;