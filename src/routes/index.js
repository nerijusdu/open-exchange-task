const router = require('express').Router();
const ratesRoutes = require('./rates');
const logsRoutes = require('./logs');

router.use('/rates', ratesRoutes);
router.use('/logs', logsRoutes);

module.exports = router;
