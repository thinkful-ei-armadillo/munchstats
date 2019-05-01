import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './DashboardRoute.css';
import DashboardChart from '../../components/DashboardChart/DashboardChart';

class DashboardRoute extends Component {
  render() {
    return (
      <div>
        <section className="dashboard">
          <Link to='/meals' className="button">
              Create, View, or Edit Your Meals
          </Link>
          <Link to='/log' className="button">
              Log a Meal, Snack, or Exercise
          </Link>
          <Link to='/reports' className="button">
              View Your Past Reports
          </Link>
        </section>
        <section className="dashChart">
          <DashboardChart />
        </section>
      </div>
    );
  }
}

export default DashboardRoute;