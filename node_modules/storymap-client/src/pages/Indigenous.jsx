import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import IndigenousQuiz from '../components/IndigenousQuiz';

const Indigenous = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    // TODO: Fetch quiz questions from backend
    setQuestions([
      {
        question: 'What is the traditional Aboriginal tool used for hunting?',
        options: ['Boomerang', 'Spear', 'Woomera', 'All of the above'],
        correct: 3
      },
      {
        question: 'Which is a traditional Aboriginal art form?',
        options: ['Dot painting', 'Rock art', 'Body painting', 'All of the above'],
        correct: 3
      }
    ]);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Indigenous Knowledge</h1>
          <p className="text-gray-600 mt-2">Learn about Aboriginal culture and traditions</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Cultural Learning</h2>
          <p className="text-gray-600 mb-4">
            Test your knowledge about Aboriginal culture, traditions, and the connection to country.
          </p>
        </div>

        <IndigenousQuiz questions={questions} />
      </main>
    </div>
  );
};

export default Indigenous;
