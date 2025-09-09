import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import NarrativeCard from '../components/NarrativeCard';
import LocationSearch from '../components/LocationSearch';

const StoryTeller = () => {
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (location) => {
    setLoading(true);
    // TODO: Fetch story from backend using Groq API
    setTimeout(() => {
      setStory({
        title: 'The Red Centre Tale',
        content: 'In the heart of Australia\'s red centre, where the ancient rocks tell stories of time immemorial, a young traveler discovered the secrets hidden in the desert winds...',
        location: location.name || 'Australian Outback'
      });
      setLoading(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">AI Rural Storyteller</h1>
          <p className="text-gray-600 mt-2">Generate unique stories about Australia's outback</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        <NarrativeCard story={story} loading={loading} />
      </main>
    </div>
  );
};

export default StoryTeller;
