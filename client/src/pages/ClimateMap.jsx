import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ClimateVisualizer from '../components/ClimateVisualizer';
import LocationSearch from '../components/LocationSearch';
import MapView from '../components/MapView';

const ClimateMap = () => {
  const [climateData, setClimateData] = useState({ past: null, future: null });
  const [loading, setLoading] = useState(false);

  const handleLocationSelect = (location) => {
    setLoading(true);
    // TODO: Fetch climate data from backend
    setTimeout(() => {
      setClimateData({
        past: { temperature: 28, rainfall: 450, wind: 15 },
        future: { temperature: 32, rainfall: 380, wind: 18 }
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <Link to="/" className="text-blue-600 hover:underline">← Back to Home</Link>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">Climate Memory Map</h1>
          <p className="text-gray-600 mt-2">Compare past and future climate scenarios</p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden" style={{ height: '400px' }}>
              <MapView />
            </div>
          </div>

          <div>
            <ClimateVisualizer 
              pastData={climateData.past} 
              futureData={climateData.future} 
              loading={loading} 
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClimateMap;
