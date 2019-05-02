import config from '../config';

const ProxyApiService = {
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
      });
  },

  getIngredientsFromSearch(food) {
    return fetch(`${config.API_ENDPOINT}/proxy/foods`, {
      method: 'POST',
      body: JSON.stringify({ food }),
      headers: {
        'content-Type': 'application/json',
      }
    })
      .then(res => res.json());
  }
};

export default ProxyApiService;