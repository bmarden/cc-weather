import React, { useState, useEffect } from 'react';
import DailyForecast from './components/DailyForecast';
import Navigation from './components/Navigation';
import Search from './components/Search';

export default () => {
  const [hourlyForecast, setHourlyForecast] = useState(null);

  // useEffect(() => {
  //   if (forecast != null) {
  //     console.log(forecast);
  //   }
  // });
  return (
    <div>
      <Navigation setDailyForecast={setHourlyForecast} />
      <div>
        <DailyForecast hourlyForecast={hourlyForecast} />
      </div>
    </div>
  );
};
