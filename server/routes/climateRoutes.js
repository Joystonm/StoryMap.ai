const express = require('express');
const { getClimateData, getClimateComparison } = require('../controllers/climateController');

const router = express.Router();

router.get('/data', getClimateData);
router.get('/comparison', getClimateComparison);

module.exports = router;
