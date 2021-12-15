const exchangeRatesService = require('../services/exchangeRatesService');
const promiseResponse = require('../utils/promiseResponse');

const router = require('express').Router();

router.get('/', promiseResponse(async (req, res) => {
  const result = await exchangeRatesService.getExchangeRates();
  res.json(result);
}));

module.exports = router;