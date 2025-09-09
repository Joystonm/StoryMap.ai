const qlooService = require('../services/qlooService');

const getCulturalInsights = async (req, res) => {
  try {
    const { location } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }

    const insights = await qlooService.getCulturalRecommendations(location);
    
    res.json(insights);
  } catch (error) {
    console.error('Cultural insights error:', error.message);
    res.status(500).json({ error: 'Failed to get cultural insights' });
  }
};

const getMusicRecommendations = async (req, res) => {
  try {
    const { location, genre = 'australian' } = req.query;
    
    const music = await qlooService.getMusicRecommendations(location, genre);
    
    res.json(music);
  } catch (error) {
    console.error('Music recommendations error:', error.message);
    res.status(500).json({ error: 'Failed to get music recommendations' });
  }
};

const getArtRecommendations = async (req, res) => {
  try {
    const { location } = req.query;
    
    const art = await qlooService.getArtRecommendations(location);
    
    res.json(art);
  } catch (error) {
    console.error('Art recommendations error:', error.message);
    res.status(500).json({ error: 'Failed to get art recommendations' });
  }
};

module.exports = {
  getCulturalInsights,
  getMusicRecommendations,
  getArtRecommendations
};
