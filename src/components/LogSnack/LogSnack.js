import React, { Component } from 'react';
import './App.css';

export default class LogSnack extends Component {

  getMealsByDate(start, end){

    fetch(`${config.API_ENDPOINT}/events/date`, {
      method: 'POST',
      body: JSON.stringify({
        'start': start,
        'end': end
      }),
      headers: {
        'content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(results => {
        const sortedEvents = this.sortEvents(results);
        // either set state or context here
        this.setState({ userEvents: sortedEvents });
      })
      .catch(err => console.log(err));
  }
  
  
  
  sortEvents = events => {
    return events.sort(function(a,b){
      if (a.date < b.date) {
        return 1;
      }
      if (a.date > b.date) {
        return -1;
      }
      return 0;
    });
  }
  
  
  // NOTE: START AND END FORMAT SHOULD BE: 2011-12-25 19:00:00 AS STRINGS

  render() {
    return (
      <div>
        
      </div>
    );
  }
}