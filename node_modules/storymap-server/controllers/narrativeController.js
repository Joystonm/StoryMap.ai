const groqService = require('../services/groqService');

const generateStory = async (req, res) => {
  try {
    const { location, theme = 'outback adventure' } = req.body;
    
    if (!location) {
      return res.status(400).json({ error: 'Location is required' });
    }

    const story = await groqService.generateNarrative(location, theme);
    
    res.json({
      title: story.title || `Tale from ${location}`,
      content: story.content,
      location: location,
      theme: theme,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Story generation error:', error.message);
    res.status(500).json({ error: 'Failed to generate story' });
  }
};

const generateCharacter = async (req, res) => {
  try {
    const { location, characterType = 'local resident' } = req.body;
    
    const character = await groqService.generateCharacter(location, characterType);
    
    res.json(character);
  } catch (error) {
    console.error('Character generation error:', error.message);
    res.status(500).json({ error: 'Failed to generate character' });
  }
};

module.exports = {
  generateStory,
  generateCharacter
};
