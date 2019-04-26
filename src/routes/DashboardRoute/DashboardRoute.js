import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  render() {
    return (
      <section className="dashboard">
        <button type="button">
          <Link to='/meals'>
            Create, View, or Edit Your Meals
          </Link>
        </button>
        
        <button type="button">
          <Link to='/log'>
            Log a Meal, Snack, or Exercise
          </Link>
        </button>
        
        <button type="button">
          <Link to='/reports'>
            View Your Past Reports
          </Link>
        </button>
      </section>
    );
  };
};

export default DashboardRoute;