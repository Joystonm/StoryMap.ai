import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to update map view when location changes
const MapUpdater = ({ center, zoom, selectedLocation }) => {
  const map = useMap();
  
  useEffect(() => {
    if (selectedLocation && selectedLocation.coordinates) {
      map.setView(selectedLocation.coordinates, zoom || 12);
    } else if (center) {
      map.setView(center, zoom || 5);
    }
  }, [map, center, zoom, selectedLocation]);
  
  return null;
};

const MapView = ({ 
  center = [-25.2744, 133.7751], 
  zoom = 5, 
  markers = [], 
  selectedLocation = null,
  onLocationClick = null 
}) => {
  const mapRef = useRef();

  // Create markers array including selected location
  const allMarkers = [...markers];
  if (selectedLocation && selectedLocation.coordinates) {
    allMarkers.push({
      position: selectedLocation.coordinates,
      popup: selectedLocation.name || 'Selected Location',
      isSelected: true
    });
  }

  const handleMapClick = (e) => {
    if (onLocationClick) {
      const { lat, lng } = e.latlng;
      onLocationClick({
        coordinates: [lat, lng],
        name: `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      });
    }
  };

  return (
    <MapContainer 
      center={selectedLocation?.coordinates || center} 
      zoom={selectedLocation ? 12 : zoom} 
      className="h-full w-full"
      ref={mapRef}
      whenCreated={(map) => {
        if (onLocationClick) {
          map.on('click', handleMapClick);
        }
      }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      
      <MapUpdater 
        center={center} 
        zoom={zoom} 
        selectedLocation={selectedLocation} 
      />
      
      {allMarkers.map((marker, index) => (
        <Marker 
          key={index} 
          position={marker.position}
          icon={marker.isSelected ? 
            new L.Icon({
              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
              shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              shadowSize: [41, 41]
            }) : undefined
          }
        >
          <Popup>
            <div>
              <strong>{marker.popup}</strong>
              {marker.isSelected && (
                <div className="mt-2 text-sm text-gray-600">
                  📍 Selected Location
                </div>
              )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
