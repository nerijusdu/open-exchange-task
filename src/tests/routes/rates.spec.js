const app = require('../../app');
const supertest = require('supertest');
const exchangeRatesService = require('../../services/exchangeRatesService');
const accessLogService = require('../../services/accessLogService');

const server = supertest(app);

describe('GET /rates', () => {
  it('should return 200 OK', async () => {
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