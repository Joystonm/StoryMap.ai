const axios = require('axios');
const { groq } = require('../config/apiKeys');

const generateNarrative = async (location, theme = 'outback adventure') => {
  try {
    const prompt = `Create an engaging, culturally respectful short story set in ${location}, Australia. 
    Theme: ${theme}
    
    Requirements:
    - 200-300 words maximum
    - Focus on the unique landscape, culture, and atmosphere of rural Australia
    - Include authentic details about the region's history, industry, or natural features
    - Respectful portrayal of Indigenous culture if relevant
    - Emotional connection to the land and community
    - Vivid, sensory descriptions that transport the reader
    
    Style: Warm, human storytelling that captures the spirit of the Australian outback.`;
    
    const response = await axios.post(`${groq.baseUrl}/chat/completions`, {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You are a master storyteller specializing in Australian outback narratives. Your stories celebrate the resilience, culture, and natural beauty of rural Australia while being respectful of Indigenous heritage and local communities.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 600,
      temperature: 0.8,
      top_p: 0.9
    }, {
      headers: {
        'Authorization': `Bearer ${groq.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const content = response.data.choices[0].message.content;
    
    // Extract title if present, otherwise generate one
    const titleMatch = content.match(/^(.+?)(?:\n|\.)/);
    const title = titleMatch ? titleMatch[1].replace(/['"]/g, '') : `Tales from ${location}`;

    return {
      content: content,
      title: title.length > 50 ? `Stories from ${location}` : title,
      theme: theme,
      location: location
    };
  } catch (error) {
    console.error('Groq API error:', error.response?.data || error.message);
    
    // Fallback story
    return {
      content: `In the heart of ${location}, where the red earth meets endless sky, stories whisper through the wind. This is a land shaped by time, weather, and the dreams of those who call it home. Every sunrise brings new possibilities, every sunset carries the wisdom of generations who have walked this ancient ground.`,
      title: `Echoes from ${location}`,
      theme: theme,
      location: location
    };
  }
};

const generateCharacter = async (location, characterType) => {
  try {
    const prompt = `Create a detailed, authentic character profile for a ${characterType} from ${location}, Australia.
    
    Include:
    - Name and age
    - Background and family history
    - Connection to the land and community
    - Daily life and challenges
    - Dreams and aspirations
    - Unique personality traits
    - How the landscape has shaped them
    
    Make them feel real and relatable, with depth and authenticity.`;
    
    const response = await axios.post(`${groq.baseUrl}/chat/completions`, {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You create authentic, respectful character profiles of rural Australians. Your characters are diverse, realistic, and reflect the true spirit of outback communities.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.7
    }, {
      headers: {
        'Authorization': `Bearer ${groq.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      character: response.data.choices[0].message.content,
      location: location,
      type: characterType
    };
  } catch (error) {
    console.error('Groq character generation error:', error.message);
    
    return {
      character: `Meet a resilient ${characterType} from ${location}, whose life is deeply intertwined with the rhythms of the Australian outback. Shaped by the land's challenges and beauty, they embody the spirit of rural Australia.`,
      location: location,
      type: characterType
    };
  }
};

const generateIndigenousQuiz = async (location, difficulty, questionCount) => {
  try {
    const prompt = `Create ${questionCount} respectful, educational multiple choice questions about Aboriginal and Torres Strait Islander culture, with focus on ${location} region if relevant.
    
    Difficulty: ${difficulty}
    
    Requirements:
    - Culturally appropriate and respectful content
    - Focus on publicly available cultural knowledge
    - Avoid sacred or sensitive information
    - Include topics like: traditional tools, art forms, connection to country, cultural practices
    - Each question should have 4 options with one correct answer
    
    Format as JSON array with objects containing: question, options (array), correct (index)`;
    
    const response = await axios.post(`${groq.baseUrl}/chat/completions`, {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You create educational, culturally respectful quiz questions about Aboriginal and Torres Strait Islander culture. You only include publicly available, appropriate cultural knowledge and avoid any sacred or sensitive content.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.3
    }, {
      headers: {
        'Authorization': `Bearer ${groq.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    try {
      return JSON.parse(response.data.choices[0].message.content);
    } catch (parseError) {
      // Fallback questions if JSON parsing fails
      return [
        {
          question: 'What is a traditional Aboriginal tool used for hunting?',
          options: ['Boomerang', 'Spear', 'Woomera', 'All of the above'],
          correct: 3
        },
        {
          question: 'Which art form is traditionally used to tell Dreamtime stories?',
          options: ['Rock paintings', 'Dot paintings', 'Sand drawings', 'All of the above'],
          correct: 3
        }
      ];
    }
  } catch (error) {
    console.error('Groq quiz generation error:', error.message);
    
    // Fallback questions
    return [
      {
        question: 'What does "Country" mean in Aboriginal culture?',
        options: ['A nation', 'The land and spiritual connection to it', 'Rural areas', 'Government territory'],
        correct: 1
      },
      {
        question: 'What is the Dreamtime?',
        options: ['Sleep period', 'Creation period in Aboriginal spirituality', 'Modern era', 'Colonial period'],
        correct: 1
      }
    ];
  }
};

const generateClimateNarrative = async (location, climateData) => {
  try {
    const prompt = `Create a compelling narrative about climate change impacts in ${location}, Australia.
    
    Climate data context: ${JSON.stringify(climateData)}
    
    Requirements:
    - 150-200 words
    - Focus on human stories and community resilience
    - Include practical adaptation strategies
    - Balance concern with hope and action
    - Mention local environmental changes
    
    Style: Informative yet emotionally engaging, inspiring action rather than despair.`;
    
    const response = await axios.post(`${groq.baseUrl}/chat/completions`, {
      model: 'mixtral-8x7b-32768',
      messages: [
        {
          role: 'system',
          content: 'You create compelling, balanced narratives about climate change that inform and inspire action while respecting local communities and their resilience.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 400,
      temperature: 0.6
    }, {
      headers: {
        'Authorization': `Bearer ${groq.apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    return {
      narrative: response.data.choices[0].message.content,
      location: location,
      type: 'climate_story'
    };
  } catch (error) {
    console.error('Groq climate narrative error:', error.message);
    
    return {
      narrative: `The people of ${location} have always been resilient, adapting to the rhythms of drought and plenty. As climate patterns shift, communities are finding new ways to thrive, from water conservation innovations to sustainable farming practices that honor both tradition and necessity.`,
      location: location,
      type: 'climate_story'
    };
  }
};

module.exports = {
  generateNarrative,
  generateCharacter,
  generateIndigenousQuiz,
  generateClimateNarrative
};
