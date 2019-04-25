import React, { Component } from 'react'
import Meals from '../../components/Meals/Meals'

class MealsRoute extends Component {
  render() {
    return (
      <section>
        <Meals history = {this.props.history} />
      </section>
    );
  }
}

export default MealsRoute
