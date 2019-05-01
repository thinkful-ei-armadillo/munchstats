import React, { Component } from 'react';
import LogMeals from '../../components/LogMeals/LogMeals';

class LogMealRoute extends Component {
  render() {
    return (
      <section>
        <LogMeals history = {this.props.history}/>
      </section>
    );
  }
}

export default LogMealRoute;