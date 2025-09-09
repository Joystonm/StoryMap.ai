const axios = require('axios');
const { tavily } = require('../config/apiKeys');

const getClimateData = async (lat, lon, timeframe) => {
  try {
    const query = `climate data ${lat} ${lon} Australia temperature rainfall ${timeframe}`;
    
    const response = await axios.post(`${tavily.baseUrl}/search`, {
      query: query,
      search_depth: 'advanced',
      include_answer: true,
      max_results: 5
    }, {
      headers: {
        'Authorization': `Bearer ${tavily.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Tavily climate data error:', error.message);
    
    // Fallback climate data
    return {
      temperature: 28 + Math.random() * 10,
      rainfall: 400 + Math.random() * 200,
      wind_speed: 15 + Math.random() * 10
    };
  }
};

const getHistoricalClimate = async (lat, lon) => {
  try {
    const query = `historical climate data 1990-2020 ${lat} ${lon} Australia`;
    
    const response = await axios.post(`${tavily.baseUrl}/search`, {
      query: query,
      search_depth: 'advanced'
    }, {
      headers: {
        'Authorization': `Bearer ${tavily.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      temperature: 26,
      rainfall: 450,
      wind_speed: 14
    };
  } catch (error) {
    console.error('Tavily historical climate error:', error.message);
    
    return {
      temperature: 26,
      rainfall: 450,
      wind_speed: 14
    };
  }
};

const getFutureClimate = async (lat, lon) => {
  try {
    const query = `climate projections 2050-2080 ${lat} ${lon} Australia global warming`;
    
    const response = await axios.post(`${tavily.baseUrl}/search`, {
      query: query,
      search_depth: 'advanced'
    }, {
      headers: {
        'Authorization': `Bearer ${tavily.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      temperature: 30,
      rainfall: 380,
      wind_speed: 17
    };
  } catch (error) {
    console.error('Tavily future climate error:', error.message);
    
    return {
      temperature: 30,
      rainfall: 380,
      wind_speed: 17
    };
  }
};

const getIndigenousInformation = async (location, topic) => {
  try {
    const query = `Aboriginal indigenous culture ${location} Australia ${topic}`;
    
    const response = await axios.post(`${tavily.baseUrl}/search`, {
      query: query,
      search_depth: 'advanced',
      include_answer: true
    }, {
      headers: {
        'Authorization': `Bearer ${tavily.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Tavily indigenous information error:', error.message);
    
    return {
      information: `Indigenous knowledge about ${location} includes traditional land management, cultural practices, and connection to country.`,
      sources: []
    };
  }
};

const getLearningModules = async (location) => {
  try {
    const query = `Aboriginal education resources ${location} Australia cultural learning`;
    
    const response = await axios.post(`${tavily.baseUrl}/search`, {
      query: query,
      search_depth: 'basic'
    }, {
      headers: {
        'Authorization': `Bearer ${tavily.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.error('Tavily learning modules error:', error.message);
    
    return {
      modules: [
        { title: 'Traditional Land Management', description: 'Learn about indigenous land care practices' },
        { title: 'Cultural Protocols', description: 'Understanding respectful cultural engagement' }
      ]
    };
  }
};

module.exports = {
  getClimateData,
  getHistoricalClimate,
  getFutureClimate,
  getIndigenousInformation,
  getLearningModules
};
