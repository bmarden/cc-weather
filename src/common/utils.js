export const convertUnixTime = (dt) => {
  // Multiply by 1000 so arg is in milliseconds
  const date = new Date(dt * 1000);
  return date.toLocaleString('en-US', { hour: 'numeric', hour12: true });
};

// Reformats forecast description
export const capitalizeFirstChar = (s) => {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
};

// Expands a given lat, lon in 10 miles each direction
// Adapted from https://gis.stackexchange.com/questions/15545/calculating-coordinates-of-square-x-miles-from-center-point
export const expandLatLon = (coords) => {
  const miles = 10;
  const df = miles / 69;
  const dl = df / Math.cos(coords.lat);
  const swCoords = { lat: coords.lat - df, lon: coords.lon - dl };
  const neCoords = { lat: coords.lat + df, lon: coords.lon + dl };
  return [swCoords, neCoords];
};
