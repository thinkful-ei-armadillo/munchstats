import React, { Component } from 'react'
import {Link} from 'react-router-dom'

class DashboardRoute extends Component {
  render() {
    return (
      <section>
        <Link to='/meals'>Create, view, or edit your meals </Link>
        <Link to='/log'>Log a meal, snack, or exercise</Link>
        <Link to='/reports'> View your past reports </Link>
      </section>
    );
  }
}

export default DashboardRoute
