const tavilyService = require('../services/tavilyService');

const getClimateData = async (req, res) => {
  try {
    const { lat, lon, timeframe = 'both' } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const climateData = await tavilyService.getClimateData(lat, lon, timeframe);
    
    res.json(climateData);
  } catch (error) {
    console.error('Climate data error:', error.message);
    res.status(500).json({ error: 'Failed to get climate data' });
  }
};

const getClimateComparison = async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    const [pastData, futureData] = await Promise.all([
      tavilyService.getHistoricalClimate(lat, lon),
      tavilyService.getFutureClimate(lat, lon)
    ]);
    
    res.json({
      past: pastData,
      future: futureData,
      comparison: {
        temperatureChange: futureData.temperature - pastData.temperature,
        rainfallChange: futureData.rainfall - pastData.rainfall,
        windChange: futureData.wind_speed - pastData.wind_speed
      }
    });
  } catch (error) {
    console.error('Climate comparison error:', error.message);
    res.status(500).json({ error: 'Failed to get climate comparison' });
  }
};

module.exports = {
  getClimateData,
  getClimateComparison
};
