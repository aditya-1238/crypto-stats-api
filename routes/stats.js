const express = require('express');
const router = express.Router();

const statsController = require('../controllers/statsController.js');
const deviationController = require('../controllers/deviationController.js');

router.get('/stats',statsController.getStats);
router.get('/deviation', deviationController.getDeviation);

module.exports = router;
