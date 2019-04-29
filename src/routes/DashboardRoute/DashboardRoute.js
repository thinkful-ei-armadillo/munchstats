import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  render() {
    return (
      <section className="dashboard">
        <Link to='/meals'>
          <button type="button">
            Create, View, or Edit Your Meals
          </button>
        </Link>
        <Link to='/log'>
          <button type="button">
            Log a Meal, Snack, or Exercise
          </button>
        </Link>
        <Link to='/reports'>
          <button type="button">
            View Your Past Reports
          </button>
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;