import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';

class DashboardRoute extends Component {
  render() {
    return (
      <section className="dashboard">
        <button type="button">
          <Link to='/meals' style={{textDecoration: 'none'}}>
            Create, View, or Edit Your Meals
          </Link>
        </button>
        <br />
        <button type="button">
          <Link to='/log' style={{textDecoration: 'none'}}>
            Log a Meal, Snack, or Exercise
          </Link>
        </button>
        <br />
        <button type="button">
          <Link to='/reports' style={{textDecoration: 'none'}}>
            View Your Past Reports
          </Link>
        </button>
      </section>
    );
  };
};

export default DashboardRoute;