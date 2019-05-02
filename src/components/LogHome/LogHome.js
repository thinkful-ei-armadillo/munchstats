import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import EventsApiService from '../../services/events-api-service';
import Loading from '../Loading/Loading';
import './LogHome.css';

export default class LogHome extends Component {
  state = {
    todayLog: []
  }

  static contextType = UserContext;

  componentDidMount(){
    EventsApiService.getTodaysEvents()
      .then(sortedEvents => this.context.setTodayEvents(sortedEvents));
  }

  clickDelete(event) {
    this.context.loadingTrue();
    EventsApiService.deleteEvent(event)
      .then(() => EventsApiService.getTodaysEvents())
      .then(sortedEvents => {
        this.context.setTodayEvents(sortedEvents);
        this.context.loadingFalse();});
  }

  generateReport = () => {
    return this.context.todayEvents.map((event, key) => { 
      const slicedDate = event.date.toString().slice(0,event.date.length-1);
      let date = moment(slicedDate).format('h:mm a');
      return(
        <div key={key} className="event">
          <div className="eventTitle">
            <h3>{event.name}</h3>
            <p onClick={() => this.clickDelete(event)}><i className="fas fa-trash"></i></p>
          </div>
          <div className="eventTime">
            <p>{event.tag}</p>
            <p>{date}</p>
          </div>
          <div className="eventNutrients">
            <p style={{fontWeight: 700}}>calories: {event.calories}</p>
            <p>carbs: {event.carbs}</p>
            <p>fat: {event.fat}</p>
            <p>protein: {event.protein}</p> 
          </div>
        </div>
      );
    });
  }

  render() {
    if(this.context.loading){
      return (
        <div className="center">
          <Loading />
        </div>
      );
    } else {
      return (
        <section className="dashboard">
          <div className="linkContainer">
            <Link to='/logmeal' className="button">
          Log a meal that you've created
            </Link>
            <Link to='/logsnack' className="button">
          Log a single item snack
            </Link>
          </div>
          <h2 className="eventsHeading">Today's activity:</h2>
          {this.generateReport()}
        </section>
      );
    }}
}