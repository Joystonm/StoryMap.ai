const groqService = require('../services/groqService');
const tavilyService = require('../services/tavilyService');

const getIndigenousKnowledge = async (req, res) => {
  try {
    const { location, topic = 'general' } = req.query;
    
    if (!location) {
      return res.status(400).json({ error: 'Location parameter is required' });
    }

    const knowledge = await tavilyService.getIndigenousInformation(location, topic);
    
    res.json(knowledge);
  } catch (error) {
    console.error('Indigenous knowledge error:', error.message);
    res.status(500).json({ error: 'Failed to get indigenous knowledge' });
  }
};

const generateQuiz = async (req, res) => {
  try {
    const { location, difficulty = 'medium', questionCount = 5 } = req.body;
    
    const quiz = await groqService.generateIndigenousQuiz(location, difficulty, questionCount);
    
    res.json(quiz);
  } catch (error) {
    console.error('Quiz generation error:', error.message);
    res.status(500).json({ error: 'Failed to generate quiz' });
  }
};

const getLearningModules = async (req, res) => {
  try {
    const { location } = req.query;
    
    const modules = await tavilyService.getLearningModules(location);
    
    res.json(modules);
  } catch (error) {
    console.error('Learning modules error:', error.message);
    res.status(500).json({ error: 'Failed to get learning modules' });
  }
};

module.exports = {
  getIndigenousKnowledge,
  generateQuiz,
  getLearningModules
};
