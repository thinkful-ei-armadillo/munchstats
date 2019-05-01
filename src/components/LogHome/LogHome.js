import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import TokenService from '../../services/token-service';
import EventsApiService from '../../services/events-api-service';
import config from '../../config';

export default class LogHome extends Component {
  state = {
    todayLog: []
  }

  static contextType = UserContext;

  componentDidMount(){
    EventsApiService.getTodaysEvents()
      .then(sortedEvents => this.context.setTodayEvents(sortedEvents));
  }

  generateReport = () => {
    return this.context.todayEvents.map((event, key) => { 
      const slicedDate = event.date.toString().slice(0,event.date.length-1);
      let date = moment(slicedDate).format('h:mm a');
      return(
        <div key={key}>
          <h3>{event.name}</h3><p>calories: {event.calories}</p><p>carbs: {event.carbs}</p> <p>fat: {event.fat}</p><p>protein: {event.protein}</p> <p>{date}</p><p>{event.tag}</p>
        </div>
      );
    });
  }

  render() {
    return (
      <section className="dashboard">
        <Link to='/logmeal' className="button">
          Log a meal that you've created
        </Link>
        <Link to='/logsnack' className="button">
          Log a single item snack
        </Link>
        <h2>Today's activity:</h2>
        {this.generateReport()}
      </section>
    );
  }
}