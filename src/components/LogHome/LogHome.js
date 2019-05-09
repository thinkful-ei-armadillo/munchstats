import React, { Component } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import UserContext from '../../contexts/UserContext';
import EventsApiService from '../../services/events-api-service';
import Loading from '../Loading/Loading';
import Back from '../../components/Back/Back';
import './LogHome.css';

export default class LogHome extends Component {
  state = {
    todayLog: []
  };

  static contextType = UserContext;

  componentDidMount(){
    EventsApiService.getTodaysEvents()
      .then(sortedEvents => this.context.setTodayEvents(sortedEvents));
  }

  clickDelete(event) {
    this.context.loadingTrue();
    this.context.clearError();
    EventsApiService.deleteEvent(event)
      .then(() => EventsApiService.getTodaysEvents())
      .then(sortedEvents => {
        this.context.setTodayEvents(sortedEvents);
        this.context.loadingFalse();})
      .catch(e => {
        this.context.setError(e);
        this.context.loadingFalse();
      });
  }

  generateReport = () => {
    return this.context.todayEvents.map((event, key) => { 
      const slicedDate = event.date.toString().slice(0,event.date.length-1);
      let date = moment(slicedDate).format('h:mm a');
      return(
        <div key={key} className="event backgroundColor4 border1 shadow">
          <div className="eventTitle">
            <h3>{event.name}</h3>
            <p onClick={() => this.clickDelete(event)}><i className="fas fa-trash trash"></i></p>
          </div>
          <div className="eventTime">
            <p>{date}</p>
            <p>Meal Type: <i>{event.tag}</i></p>
          </div>
          <div className="eventNutrients">
            <p style={{fontWeight: 700}}>Calories: {event.calories}</p>
            <p>Carbs: {event.carbs}</p>
            <p>Fat: {event.fat}</p>
            <p>Protein: {event.protein}</p> 
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
    }
    else {
      return (
        <>
          <Back history={this.props.history} path={'/'} />
          <section className="dashboard">
            <div className="linkContainer">
              <Link to='/logmeal' className="button">
                Log a Meal That You've Created
              </Link>
              <Link to='/logsnack' className="button">
                Log a Single Item Snack
              </Link>
            </div>
            <h2 className="eventsHeading">Today's Activity:</h2>
            {this.generateReport()}
          </section>
        </>
      );
    }
  }
}