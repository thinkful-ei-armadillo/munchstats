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
        )
    },

    getStatsforServing(body) {
      return fetch(`${config.API_ENDPOINT}/proxy/nutrition`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'content-Type': 'application/json'
        }
      })
        .then(res => {
          return (res.json());
        })
    },

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

    updateMeal(meal) {
      return fetch(`${config.API_ENDPOINT}/meal`, {
        method: 'PATCH',
        body: JSON.stringify(meal),
        headers: {
          'content-Type': 'application/json',
          'authorization': `bearer ${TokenService.getAuthToken()}`
        }
      })
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
    },

    getIngredientsFromSearch(food) {
      return fetch(`${config.API_ENDPOINT}/proxy/foods`, {
        method: 'POST',
        body: JSON.stringify({ food }),
        headers: {
          'content-Type': 'application/json',
        }
      })
        .then(res => res.json())
    },

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

export default MealsApiService;