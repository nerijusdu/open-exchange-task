const router = require('express').Router();
const ratesRoutes = require('./rates');

router.use('/rates', ratesRoutes);

module.exports = router;
