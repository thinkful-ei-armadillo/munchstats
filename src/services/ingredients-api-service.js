import config from '../config';
import TokenService from './token-service';

const IngredientsApiService = {
  addIngredient(mealId, results) {
    return fetch(`${config.API_ENDPOINT}/ingredients/${mealId}`, {
      method: 'POST',
      body: JSON.stringify(results),
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
    .then(res => res.json())
  },

  deleteIngredient(ingredient_id) {
    return fetch(`${config.API_ENDPOINT}/ingredients/`, {
      method: 'DELETE',
      body: JSON.stringify({ ingredient_id }),
      headers: {
        'Content-Type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      }
    })
      .then(res => res.json)
  },

  getIngredientsForMeal(id) {
    return fetch(`${config.API_ENDPOINT}/ingredients`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${TokenService.getAuthToken()}`
      },
      body: JSON.stringify({ meal: { id } })
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  }
}

export default IngredientsApiService;