import config from '../config';
import TokenService from './token-service';

const MealsApiService = {
  // get all of a user's meals
  getMeals() {
    return fetch(`${config.API_ENDPOINT}/meal`, {
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

  // delete meal based on id
  deleteMeal(meal) {
    return fetch(`${config.API_ENDPOINT}/meal`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${TokenService.getAuthToken()}`,
        'content-type': 'application/json'
      },
      body: JSON.stringify({meal: meal})
    })
      .then(res => 
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );    
  },

  // add meal to database
  postMeal(meal) {
    return fetch(`${config.API_ENDPOINT}/meal`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify(meal)
    })
      .then(res => 
        (!res.ok) 
          ? res.json().then(e => Promise.reject(e)) 
          : res.json()
      );
  },

  getMealById(id) {
    return fetch(`${config.API_ENDPOINT}/meal/${id}`, {
      headers: {
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      );
  },

    updateMeal(meal) {
      return fetch(`${config.API_ENDPOINT}/meal`, {
        method: 'PATCH',
        body: JSON.stringify(meal),
        headers: {
          'content-Type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
    }
}

export default MealsApiService;