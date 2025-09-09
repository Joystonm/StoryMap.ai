import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CulturalInsights from '../components/CulturalInsights';
import LocationSearch from '../components/LocationSearch';

const Explore = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (location) => {
    setLoading(true);
    // TODO: Fetch cultural insights from backend
    setTimeout(() => {
      setInsights({
        music: 'Traditional Aboriginal music and contemporary country sounds',
        art: 'Rock art, dot paintings, and modern indigenous artwork',
        food: 'Bush tucker, damper bread, and outback cuisine'
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Outback Culture Explorer</h1>
          <p className="text-gray-600 mt-2">Discover the rich cultural heritage of Australia's outback</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <LocationSearch onLocationSelect={handleLocationSelect} />
        </div>

        <CulturalInsights insights={insights} loading={loading} />
      </main>
    </div>
  );
};

export default Explore;
