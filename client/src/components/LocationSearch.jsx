import React, { useState } from 'react';
import apiClient from '../utils/apiClient';

const LocationSearch = ({ onLocationSelect }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const searchLocation = async (searchQuery) => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await apiClient.get(`/location/search?query=${encodeURIComponent(searchQuery)}`);
      setSuggestions(response.data);
      
      if (response.data.length === 0) {
        setError('No locations found. Try a different search term.');
      }
    } catch (err) {
      setError('Failed to search locations. Please try again.');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    // Clear suggestions if input is empty
    if (!value.trim()) {
      setSuggestions([]);
      setError('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      searchLocation(query);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const location = {
      name: suggestion.display_name || suggestion.name,
      lat: parseFloat(suggestion.lat),
      lon: parseFloat(suggestion.lon),
      coordinates: [parseFloat(suggestion.lat), parseFloat(suggestion.lon)]
    };
    
    setQuery(location.name);
    setSuggestions([]);
    setError('');
    onLocationSelect(location);
  };

  return (
    <div className="relative">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for a location in Australia..."
          className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />
        <button
          onClick={() => searchLocation(query)}
          disabled={loading || !query.trim()}
          className="px-4 py-3 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? '🔍' : '🔍'}
        </button>
      </div>

      {error && (
        <div className="mt-2 p-2 bg-red-100 border border-red-300 rounded text-red-700 text-sm">
          {error}
        </div>
      )}

      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 z-10 max-h-60 overflow-y-auto">
          {suggestions.map((suggestion, index) => (
            <div
              key={index}
              onClick={() => handleSuggestionClick(suggestion)}
              className="p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
            >
              <div className="font-medium text-gray-800">
                {suggestion.display_name || suggestion.name}
              </div>
              {suggestion.address && (
                <div className="text-sm text-gray-500">
                  {suggestion.address.state}, {suggestion.address.country}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
