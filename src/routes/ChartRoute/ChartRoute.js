import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import CalorieChart from '../../components/CalorieChart/CalorieChart';
import GramChart from '../../components/GramChart/GramChart';

class ChartRoute extends Component {
    render() {
        return (
            <section className="dashChart">
                <CalorieChart />
                <GramChart />
            </section>
        );
    }
}

export default ChartRoute;