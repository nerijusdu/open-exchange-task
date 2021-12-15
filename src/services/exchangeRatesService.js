const axios = require('axios');

class ExchangeRatesService {
  constructor() {
    this.api = axios.create({
      baseURL: 'https://openexchangerates.org/api/',
      headers: {
        Authorization: `Token ${process.env.APP_ID}`,
      },
    });
  }

  async getExchangeRates() {
    const response = await this.api.get('/latest.json');
    return response.data;
  }
}

module.exports = new ExchangeRatesService();