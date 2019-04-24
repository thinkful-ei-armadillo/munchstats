import config from '../config'
import TokenService from './token-service';

const MealsApiService = {
    //get function that gets all of a user's meals
    getMeals() {
        return fetch(`${config.API_ENDPOINT}/meals`, {
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

}

export default MealsApiService;