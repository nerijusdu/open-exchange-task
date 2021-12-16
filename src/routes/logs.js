const promiseResponse = require('../utils/promiseResponse');
const accessLogService = require('../services/accessLogService');

const router = require('express').Router();

router.get('/', promiseResponse(async (req, res) => {
  const result = await accessLogService.getLogs({
    startDate: req.query.startDate,
    endDate: req.query.endDate,
  });
  res.json(result);
}));

module.exports = router;