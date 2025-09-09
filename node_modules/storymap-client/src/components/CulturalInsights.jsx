import React, { useState } from 'react';

const CulturalInsights = ({ insights, loading = false }) => {
  const [activeTab, setActiveTab] = useState('music');

  if (loading) {
    return (
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gradient-to-r from-green-200 to-blue-200 rounded w-1/2 mb-6"></div>
          <div className="flex space-x-4 mb-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-8 bg-gray-200 rounded-full w-16"></div>
            ))}
          </div>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-4 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'music', label: '🎵 Music', icon: '🎵' },
    { id: 'art', label: '🎨 Art', icon: '🎨' },
    { id: 'food', label: '🍽️ Food', icon: '🍽️' },
    { id: 'traditions', label: '🏛️ Culture', icon: '🏛️' }
  ];

  const renderContent = () => {
    if (!insights) {
      return (
        <div className="text-center py-8">
          <div className="text-4xl mb-4">🎭</div>
          <p className="text-gray-500">Select a location to discover cultural insights</p>
        </div>
      );
    }

    const content = insights[activeTab];
    if (!content) return <p className="text-gray-500">No information available</p>;

    return (
      <div className="space-y-4">
        <p className="text-gray-700 leading-relaxed">{content}</p>
        
        {/* Interactive Elements */}
        {activeTab === 'music' && (
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4">
            <h4 className="font-semibold text-purple-800 mb-2">🎧 Listen Now</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between bg-white rounded p-2">
                <span className="text-sm">Traditional Outback Ballads</span>
                <button className="text-purple-600 hover:text-purple-800">▶️</button>
              </div>
              <div className="flex items-center justify-between bg-white rounded p-2">
                <span className="text-sm">Contemporary Aboriginal Music</span>
                <button className="text-purple-600 hover:text-purple-800">▶️</button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'art' && (
          <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-lg p-4">
            <h4 className="font-semibold text-orange-800 mb-2">🖼️ View Gallery</h4>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white rounded p-2 text-center">
                <div className="h-16 bg-gradient-to-br from-orange-200 to-red-200 rounded mb-2"></div>
                <span className="text-xs">Dot Paintings</span>
              </div>
              <div className="bg-white rounded p-2 text-center">
                <div className="h-16 bg-gradient-to-br from-blue-200 to-green-200 rounded mb-2"></div>
                <span className="text-xs">Rock Art</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'food' && (
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">🍴 Local Recipes</h4>
            <div className="space-y-2">
              <div className="bg-white rounded p-2 flex justify-between items-center">
                <span className="text-sm">Bush Tucker Guide</span>
                <span className="text-green-600 text-xs">📖 Read</span>
              </div>
              <div className="bg-white rounded p-2 flex justify-between items-center">
                <span className="text-sm">Damper Bread Recipe</span>
                <span className="text-green-600 text-xs">👨‍🍳 Cook</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'traditions' && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-4">
            <h4 className="font-semibold text-indigo-800 mb-2">📚 Learn More</h4>
            <div className="space-y-2">
              <div className="bg-white rounded p-2 flex justify-between items-center">
                <span className="text-sm">Cultural Protocols</span>
                <span className="text-indigo-600 text-xs">📖 Guide</span>
              </div>
              <div className="bg-white rounded p-2 flex justify-between items-center">
                <span className="text-sm">Community Events</span>
                <span className="text-indigo-600 text-xs">📅 Calendar</span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 text-white">
        <h3 className="text-xl font-bold">Cultural Insights</h3>
        <p className="text-green-100 text-sm">Discover the heart of Australian culture</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-gray-200 bg-gray-50">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-3 px-2 text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            <div className="flex flex-col items-center">
              <span className="text-lg mb-1">{tab.icon}</span>
              <span className="hidden sm:inline">{tab.label.split(' ')[1]}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="p-6">
        {renderContent()}
      </div>
    </div>
  );
};

export default CulturalInsights;
