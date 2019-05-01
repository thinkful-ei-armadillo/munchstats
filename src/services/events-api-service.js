import config from '../config';
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
  }
}

export default EventsApiService;