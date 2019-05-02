import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';


class DashboardRoute extends Component {
  render() {
    return (
      <section className="dashboard">
        <Link to='/meals' className="button">
            Create, View, or Edit Your Meals
        </Link>
        <Link to='/log' className="button">
            Log a Meal or Snack
        </Link>
        <Link to='/charts' className="button">
            View Your Past Reports
        </Link>
      </section>
    );
  }
}

export default DashboardRoute;