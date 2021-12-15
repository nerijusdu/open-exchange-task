const exchangeRatesService = require('../services/exchangeRatesService');

const router = require('express').Router();

router.get('/', async (req, res) => {
  const result = await exchangeRatesService.getExchangeRates();
  res.json(result);
});

module.exports = router;