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
