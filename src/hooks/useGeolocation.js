import { useState, useEffect } from 'react';
import { DISTRICT_PRESETS } from '../services/geoService';

export function useGeolocation() {
  const [coords, setCoords] = useState({
    lat: 20.0059,
    lon: 73.7797,
    districtName: 'Nashik District',
    state: 'Maharashtra',
    isAutoDetected: false,
  });
  const [loading, setLoading] = useState(false);
  const [geoError, setGeoError] = useState(null);

  const requestAutoLocation = () => {
    if (!navigator.geolocation) {
      setGeoError('Geolocation is not supported by your browser.');
      return;
    }

    setLoading(true);
    setGeoError(null);

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        // Find closest preset or use coordinate
        const closest = findClosestDistrict(latitude, longitude);
        setCoords({
          lat: Number(latitude.toFixed(4)),
          lon: Number(longitude.toFixed(4)),
          districtName: closest ? closest.name : 'Detected Field GPS',
          state: closest ? closest.state : 'Local Region',
          isAutoDetected: true,
        });
        setLoading(false);
      },
      (err) => {
        setGeoError(err.message || 'Unable to retrieve location.');
        setLoading(false);
      },
      { timeout: 8000 }
    );
  };

  const selectDistrict = (districtId) => {
    const found = DISTRICT_PRESETS.find((d) => d.id === districtId);
    if (found) {
      setCoords({
        lat: found.lat,
        lon: found.lon,
        districtName: found.name,
        state: found.state,
        isAutoDetected: false,
      });
    }
  };

  return {
    coords,
    loading,
    geoError,
    requestAutoLocation,
    selectDistrict,
    districts: DISTRICT_PRESETS,
  };
}

function findClosestDistrict(lat, lon) {
  let minDistance = Infinity;
  let closest = DISTRICT_PRESETS[0];

  DISTRICT_PRESETS.forEach((d) => {
    const dist = Math.hypot(d.lat - lat, d.lon - lon);
    if (dist < minDistance) {
      minDistance = dist;
      closest = d;
    }
  });

  return closest;
}
