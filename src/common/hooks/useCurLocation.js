import { useState, useEffect } from 'react';

const useCurLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation not supported.');
      return;
    }
    let timer = setTimeout(() => {
      navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
    }, 10 * 1000);

    return () => {
      clearTimeout(timer);
    };
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
