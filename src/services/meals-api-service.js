import config from '../config'
import TokenService from './token-service';

const MealsApiService = {
    //get function that gets all of a user's meals
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
      )
    },
    deleteMeal(mealId) {
        return fetch(`${config.API_ENDPOINT}/meal`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${TokenService.getAuthToken()}`
            },
        })
      .then(res => res.json)    
    },
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
            )
    },
}

export default MealsApiService;