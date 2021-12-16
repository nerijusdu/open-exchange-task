const exchangeRatesService = require('../../services/exchangeRatesService');

describe('exchangeRatesService', () => {
  describe('getExchangeRates', () => {
    it('should return an object with the exchange rates', async () => {
      const mockRates = {
        base: 'USD',
        rates: {
          USD: 1.0,
          GBP: 0.8,
          EUR: 1.1
        }
      };
      const spy = jest.spyOn(exchangeRatesService._api, 'get').mockResolvedValue({ data: mockRates });

      const exchangeRates = await exchangeRatesService.getExchangeRates();

      expect(spy).toHaveBeenCalled();
      expect(exchangeRates).toEqual(mockRates);
    });
  });
});