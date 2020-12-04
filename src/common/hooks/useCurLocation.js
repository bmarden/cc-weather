import { useState, useEffect } from 'react';

const useCurLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolcation not supported.');
      return;
    }
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  const handleSuccess = (pos) => {
    const { lat, lng } = pos.coords;

    setLocation({
      lat,
      lng,
    });
  };

  const handleError = (err) => {
    setError(err.message);
  };

  return { location, error };
};

export default useCurLocation;
