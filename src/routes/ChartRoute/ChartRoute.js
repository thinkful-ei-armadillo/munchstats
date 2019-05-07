import React, { Component } from 'react';
import CalorieChart from '../../components/CalorieChart/CalorieChart';
import GramChart from '../../components/GramChart/GramChart';
import Back from '../../components/Back/Back';
import './ChartRoute.css';

class ChartRoute extends Component {
  render() {
    return (
      <>
        <Back history={this.props.history} path={'/'} />
        <section className="chartsPage">
          <h2>Today's Nutrition:</h2>
          <h3>Calories:</h3>
          <CalorieChart />
          <h3>Other Nutritional Stats:</h3>
          <GramChart />
        </section>
      </>
    );
  }
}

export default ChartRoute;