const supertest = require('supertest');
const app = require('../../app');
const exchangeRatesService = require('../../services/exchangeRatesService');
const accessLogService = require('../../services/accessLogService');

const server = supertest(app);

describe('GET /rates', () => {
  it('should return rates', async () => {
    const rates = { base: 'USD', rates: { EUR: 1 } };
    jest.spyOn(exchangeRatesService, 'getExchangeRates').mockResolvedValue(rates);

    const response = await server.get('/rates');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(rates);
  });

  it('should add access log', async () => {
    const spy = jest.spyOn(accessLogService, 'addLog');

    await server.get('/rates');

    expect(spy).toHaveBeenCalledWith('::ffff:127.0.0.1');
  });
});