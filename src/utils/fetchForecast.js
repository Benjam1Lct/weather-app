const API_KEY = '8a85afb9c508e181779be90a10d2bc12';

export const fetchForecast = async (lat, lon) => {
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  return data.list; // tableau de prévisions toutes les 3h
};
