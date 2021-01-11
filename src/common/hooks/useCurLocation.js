import { useState, useEffect } from 'react';
import axios from 'axios';

const useCurLocation = () => {
  const [error, setError] = useState();
  const [location, setLocation] = useState();

  useEffect(() => {
    // Try to get user location with ipinfo initially (least invasive)
    axios
      .get('https://ipinfo.io/json', {
        params: {
          token: process.env.REACT_APP_IPINFO_API_KEY,
        },
      })
      .then((response) => {
        let latLng = response.data.loc.split(',');
        setLocation({
          latitude: parseFloat(latLng[0]),
          longitude: parseFloat(latLng[1]),
        });
      })
      .catch((error) => {
        // If ipinfo is blocked or failed, try with geolocation
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
        } else {
          // If geolocation not supported, set error code
          setError(error);
        }
      });

    // Cleanup
    return () => {};
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
