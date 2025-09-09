const express = require('express');
const { getCulturalInsights, getMusicRecommendations, getArtRecommendations } = require('../controllers/cultureController');

const router = express.Router();

router.get('/insights', getCulturalInsights);
router.get('/music', getMusicRecommendations);
router.get('/art', getArtRecommendations);

module.exports = router;
