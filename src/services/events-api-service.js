import config from '../config';
import moment from 'moment';
import TokenService from './token-service';

const EventsApiService = {
  logFood(meal, date, tag) {
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({
        name: meal.name,
        date,
        calories: meal.total_calorie,
        protein: meal.total_protein,
        fat: meal.total_fat,
        carbs: meal.total_carbs,
        tag
      })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  getTodaysEvents(){
    return fetch(`${config.API_ENDPOINT}/events/date`, {
      method: 'POST',
      body: JSON.stringify({
        'start': moment().format('YYYY-MM-DD 00:00:00'),
        'end': moment().format('YYYY-MM-DD 23:59:59')
      }),
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => this.sortEvents(res))
      .catch(err => console.log(err));
  },

  deleteEvent(event){
    return fetch(`${config.API_ENDPOINT}/events`, {
      method: 'DELETE',
      body: JSON.stringify({
        'event': event
      }),
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  },
  
  sortEvents(events){
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
};

export default EventsApiService;