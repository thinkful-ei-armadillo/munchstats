import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import './LogHomeRoute.css';

class LogHomeRoute extends Component {
  render() {
    return (
      <section className="dashboard">
        <Link to='/logmeal' className="button">
          Log a meal that you've created
        </Link>
        <Link to='/logsnack' className="button">
          Log a single item snack
        </Link>
        <Link to='/logexercise' className="button">
          Log your work outs for the day
        </Link>
      </section>
    );
  }
}

export default LogHomeRoute;