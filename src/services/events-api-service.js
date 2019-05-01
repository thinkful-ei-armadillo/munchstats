import config from '../config';
import moment from 'moment';
import TokenService from './token-service';

const EventsApiService = {
  
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