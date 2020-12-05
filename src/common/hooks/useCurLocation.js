import { useState, useEffect } from 'react';

const geoOptions = {
  timeout: 10 * 10000,
};

const useCurLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolcation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError, geoOptions);
  }, []);

  const handleSuccess = (pos) => {
    const { latitude, longitude } = pos.coords;

    setLocation({
      latitude,
      longitude,
    });
  };

  const handleError = (err) => {
    setError(err.message);
  };

  return { location, error };
};

export default useCurLocation;
