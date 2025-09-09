import React, { useState } from 'react';

const IndigenousQuiz = ({ questions = [], mode = 'quiz' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [activeMode, setActiveMode] = useState(mode);

  const handleAnswer = (answerIndex) => {
    setSelectedAnswer(answerIndex);
    if (questions[currentQuestion]?.correct === answerIndex) {
      setScore(score + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowResult(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setScore(0);
    setShowResult(false);
  };

  // Language Learning Content
  const languageWords = [
    { word: 'Yurrampi', meaning: 'Honey ant', language: 'Warlpiri' },
    { word: 'Billabong', meaning: 'Waterhole', language: 'Wiradjuri' },
    { word: 'Corroboree', meaning: 'Sacred ceremony', language: 'Various' },
    { word: 'Tjukurpa', meaning: 'Dreamtime law', language: 'Pitjantjatjara' }
  ];

  // Dreamtime Stories
  const dreamtimeStories = [
    {
      title: 'The Rainbow Serpent',
      preview: 'Long ago, the Rainbow Serpent slept beneath the earth...',
      region: 'Northern Australia'
    },
    {
      title: 'How the Kangaroo Got Its Tail',
      preview: 'In the Dreamtime, all animals looked very different...',
      region: 'Central Australia'
    }
  ];

  if (activeMode === 'language') {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-500 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">Language Revival</h3>
          <p className="text-purple-100 text-sm">Learn First Nations words and phrases</p>
        </div>

        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveMode('quiz')}
            className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            🧠 Quiz
          </button>
          <button
            onClick={() => setActiveMode('language')}
            className="flex-1 py-3 px-4 text-sm font-medium text-purple-600 border-b-2 border-purple-600 bg-white"
          >
            🗣️ Language
          </button>
          <button
            onClick={() => setActiveMode('stories')}
            className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            📚 Stories
          </button>
        </div>

        <div className="p-6">
          <h4 className="font-semibold text-gray-800 mb-4">Word of the Day</h4>
          <div className="space-y-4">
            {languageWords.map((item, index) => (
              <div key={index} className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-l-4 border-purple-500">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-lg font-bold text-purple-800">{item.word}</h5>
                  <span className="text-xs text-purple-600 bg-purple-100 px-2 py-1 rounded">{item.language}</span>
                </div>
                <p className="text-purple-700">{item.meaning}</p>
                <button className="mt-2 text-sm text-purple-600 hover:text-purple-800 flex items-center">
                  🔊 Listen to pronunciation
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (activeMode === 'stories') {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 p-4 text-white">
          <h3 className="text-xl font-bold mb-1">Dreamtime Stories</h3>
          <p className="text-orange-100 text-sm">Ancient stories that shaped the land</p>
        </div>

        <div className="flex border-b border-gray-200 bg-gray-50">
          <button
            onClick={() => setActiveMode('quiz')}
            className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            🧠 Quiz
          </button>
          <button
            onClick={() => setActiveMode('language')}
            className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
          >
            🗣️ Language
          </button>
          <button
            onClick={() => setActiveMode('stories')}
            className="flex-1 py-3 px-4 text-sm font-medium text-orange-600 border-b-2 border-orange-600 bg-white"
          >
            📚 Stories
          </button>
        </div>

        <div className="p-6">
          <div className="space-y-4">
            {dreamtimeStories.map((story, index) => (
              <div key={index} className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4 border-l-4 border-orange-500">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="text-lg font-bold text-orange-800">{story.title}</h5>
                  <span className="text-xs text-orange-600 bg-orange-100 px-2 py-1 rounded">{story.region}</span>
                </div>
                <p className="text-orange-700 mb-3 italic">"{story.preview}"</p>
                <button className="text-sm text-orange-600 hover:text-orange-800 font-medium">
                  📖 Read full story →
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-6 text-center">
            <button className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white px-6 py-3 rounded-lg hover:from-orange-600 hover:to-yellow-600 transition-all">
              🎧 Listen to Audio Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Mode
  if (questions.length === 0) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 text-center">
        <div className="text-4xl mb-4">🪃</div>
        <h3 className="text-lg font-semibold text-gray-700 mb-2">Indigenous Knowledge Hub</h3>
        <p className="text-gray-500 mb-4">Explore Aboriginal culture through interactive learning</p>
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => setActiveMode('language')}
            className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200"
          >
            🗣️ Learn Language
          </button>
          <button
            onClick={() => setActiveMode('stories')}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200"
          >
            📚 Read Stories
          </button>
        </div>
      </div>
    );
  }

  if (showResult) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-4 text-white text-center">
          <h3 className="text-xl font-bold mb-1">Quiz Complete! 🎉</h3>
          <p className="text-green-100 text-sm">Your cultural knowledge score</p>
        </div>
        
        <div className="p-6 text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {score}/{questions.length}
          </div>
          <p className="text-gray-600 mb-6">
            {score === questions.length ? 'Perfect! You\'re a cultural expert!' :
             score >= questions.length * 0.7 ? 'Great job! Keep learning!' :
             'Good start! There\'s more to discover!'}
          </p>
          
          <div className="flex justify-center space-x-3">
            <button 
              onClick={resetQuiz}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              🔄 Try Again
            </button>
            <button
              onClick={() => setActiveMode('language')}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              🗣️ Learn Language
            </button>
            <button
              onClick={() => setActiveMode('stories')}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
            >
              📚 Read Stories
            </button>
          </div>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 to-purple-500 p-4 text-white">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-bold">Cultural Quiz</h3>
          <span className="text-indigo-100 text-sm">
            {currentQuestion + 1} of {questions.length}
          </span>
        </div>
        <div className="w-full bg-indigo-400 rounded-full h-2">
          <div 
            className="bg-white rounded-full h-2 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="flex border-b border-gray-200 bg-gray-50">
        <button
          onClick={() => setActiveMode('quiz')}
          className="flex-1 py-3 px-4 text-sm font-medium text-indigo-600 border-b-2 border-indigo-600 bg-white"
        >
          🧠 Quiz
        </button>
        <button
          onClick={() => setActiveMode('language')}
          className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          🗣️ Language
        </button>
        <button
          onClick={() => setActiveMode('stories')}
          className="flex-1 py-3 px-4 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          📚 Stories
        </button>
      </div>

      <div className="p-6">
        <h4 className="text-lg font-semibold mb-4 text-gray-800">{question.question}</h4>
        <div className="space-y-3">
          {question.options?.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(index)}
              className={`w-full text-left p-4 rounded-lg border-2 transition-all ${
                selectedAnswer === index 
                  ? selectedAnswer === question.correct
                    ? 'bg-green-100 border-green-500 text-green-800'
                    : 'bg-red-100 border-red-500 text-red-800'
                  : 'hover:bg-gray-50 border-gray-200 hover:border-gray-300'
              }`}
              disabled={selectedAnswer !== null}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full border-2 border-current mr-3 flex items-center justify-center text-xs font-bold">
                  {String.fromCharCode(65 + index)}
                </span>
                {option}
              </div>
            </button>
          ))}
        </div>
        
        {selectedAnswer !== null && (
          <div className="mt-6 text-center">
            <button
              onClick={nextQuestion}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all"
            >
              {currentQuestion < questions.length - 1 ? 'Next Question →' : 'Finish Quiz 🎉'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IndigenousQuiz;
