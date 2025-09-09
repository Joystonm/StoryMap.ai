import React, { useState } from "react";
import { Link } from "react-router-dom";
import MapView from "../components/MapView";
import LocationSearch from "../components/LocationSearch";
import NarrativeCard from "../components/NarrativeCard";
import apiClient from "../utils/apiClient";

const Home = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStory, setSelectedStory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generateStory = async (location) => {
    setLoading(true);
    setError("");

    try {
      const response = await apiClient.post("/narrative/story", {
        location: location.name,
        theme: "outback adventure",
      });

      setSelectedStory({
        ...response.data,
        location: location.name,
      });
    } catch (err) {
      setError("Failed to generate story. Please try again.");
      setSelectedStory(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location) => {
    console.log("Location selected:", location);
    setSelectedLocation(location);
    setError("");

    // Generate story for the selected location
    generateStory(location);
  };

  const handleMapClick = (location) => {
    setSelectedLocation(location);
    generateStory(location);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50">
      {/* Hero Section */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
              StoryMap.ai
            </h1>
            <p className="text-xl md:text-2xl text-orange-700 mb-2">
              Where AI Turns the Outback into Stories
            </p>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore the untold stories of rural Australia through AI-powered
              narratives, cultural insights, and interactive maps
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Map Section */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <LocationSearch onLocationSelect={handleLocationSelect} />
            </div>
            <div
              className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg overflow-hidden"
              style={{ height: "500px" }}
            >
              <MapView
                selectedLocation={selectedLocation}
                onLocationClick={handleMapClick}
              />
            </div>

            {/* Location Info */}
            {selectedLocation && (
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-4">
                <h3 className="font-semibold text-gray-800 mb-2">
                  Selected Location
                </h3>
                <p className="text-gray-600">{selectedLocation.name}</p>
                <p className="text-sm text-gray-500">
                  📍 {selectedLocation.coordinates[0].toFixed(4)},{" "}
                  {selectedLocation.coordinates[1].toFixed(4)}
                </p>
              </div>
            )}
          </div>

          {/* Story Panel */}
          <div className="space-y-6">
            {/* Current Story */}
            <NarrativeCard story={selectedStory} loading={loading} />

            {/* Feature Explorer */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">
                Discover Australia
              </h2>
              <div className="space-y-3">
                <Link
                  to="/storyteller"
                  className="block p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg hover:from-blue-100 hover:to-blue-200 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">📖</span>
                    <div>
                      <h3 className="font-semibold text-blue-800">
                        AI Rural Storyteller
                      </h3>
                      <p className="text-sm text-blue-600">
                        Mini documentaries of towns & farms
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/explore"
                  className="block p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg hover:from-green-100 hover:to-green-200 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🎨</span>
                    <div>
                      <h3 className="font-semibold text-green-800">
                        Outback Culture Explorer
                      </h3>
                      <p className="text-sm text-green-600">
                        Music, art & cultural insights
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/climate"
                  className="block p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg hover:from-orange-100 hover:to-orange-200 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🌡️</span>
                    <div>
                      <h3 className="font-semibold text-orange-800">
                        Climate Memory Map
                      </h3>
                      <p className="text-sm text-orange-600">
                        Past vs future visualizations
                      </p>
                    </div>
                  </div>
                </Link>

                <Link
                  to="/indigenous"
                  className="block p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg hover:from-purple-100 hover:to-purple-200 transition-all"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🪃</span>
                    <div>
                      <h3 className="font-semibold text-purple-800">
                        Indigenous Knowledge
                      </h3>
                      <p className="text-sm text-purple-600">
                        Language, stories & traditions
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6">
              <h3 className="font-semibold mb-3 text-gray-800">
                Explore by Numbers
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Stories Generated</span>
                  <span className="font-semibold">1,247+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Locations Mapped</span>
                  <span className="font-semibold">850+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cultural Insights</span>
                  <span className="font-semibold">2,100+</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;
