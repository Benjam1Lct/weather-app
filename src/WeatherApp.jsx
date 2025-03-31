import { useEffect, useState } from 'react';
import sunny from './assets/images/sunny.png';
import cloudy from './assets/images/cloudy.png';
import rainy from './assets/images/rainy.png';
import snowy from './assets/images/snowy.png';
import loadingGif from './assets/images/loading.gif';

import cold from './assets/images/backgrounds/cold.png';
import evening from './assets/images/backgrounds/evening.png';
import green from './assets/images/backgrounds/green.jpeg';
import morning from './assets/images/backgrounds/morning.png';
import night from './assets/images/backgrounds/night.png';
import summer from './assets/images/backgrounds/summer.png';
import sunrise from './assets/images/backgrounds/sunrise.png';
import yellow from './assets/images/backgrounds/yellow.png';


import { loadOptions } from './utils/geoApi';
import { fetchWeather } from './utils/weatherApi';

import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import Loader from './components/Loader';
import MapTile from './components/MapTile';

const WeatherApp = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [cityImage, setCityImage] = useState(null);
  const [searchValue, setSearchValue] = useState({
    value: "47.2184 -1.5536",
    label: "Nantes, FR",
  });
  const [coords, setCoords] = useState({ lat: null, lon: null, city: '' });

  const weatherImages = {
    Clear: sunny,
    Clouds: cloudy,
    Rain: rainy,
    Snow: snowy,
    Haze: cloudy,
    Mist: cloudy,
  };

  const backgroundImages = {
    Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
    Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
    Snow: 'linear-gradient(to right, #aff2ff, #fff2ff)',
    Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
    Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
  };

  const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;
  const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : backgroundImages.Clear;

  useEffect(() => {
    const fetchDefaultWeather = async () => {
      setLoading(true);
      const defaultLat = 47.2184;
      const defaultLon = -1.5536;
      const defaultData = await fetchWeather(defaultLat, defaultLon);
      setCoords({
        lat: defaultData.coord.lat,
        lon: defaultData.coord.lon,
        city: defaultData.name,
      });
      setData(defaultData);
      setCityImage(getBackgroundForWeather(defaultData)); // ou weatherData
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);

  const onSearchChange = async (selectedOption) => {
    setSearchValue(selectedOption);
    if (!selectedOption) return;

    const [lat, lon] = selectedOption.value.split(' ');
    setLoading(true);
    const weatherData = await fetchWeather(lat, lon);
    setCoords({
      lat: weatherData.coord.lat,
      lon: weatherData.coord.lon,
      city: weatherData.name,
    });
    
    setData(weatherData);
    setCityImage(getBackgroundForWeather(weatherData)); // ou weatherData
    setLoading(false);
  };

  const getBackgroundForWeather = (weatherData) => {
    if (!weatherData || !weatherData.main || !weatherData.weather) return green;
  
    const temp = weatherData.main.temp;
    const weather = weatherData.weather[0].main;
    const hour = new Date().getHours();
  
    if (temp < 5) return cold;
    if (temp > 25) return summer;
    if (hour >= 21 || (weather === "Clear" && hour >= 20)) return night;
    if (hour >= 18) return evening;
    if (hour < 10) return morning;
    if (hour >= 6 && hour <= 8) return sunrise;
    if (weather === "Clear") return yellow;
  
    return green; // valeur par défaut
  };

  return (
    <div className="Container"
      style={{
        backgroundImage: cityImage ? `url(${cityImage})` : backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}>

      <div className="">
        <div className="weather-app">
          <div className="search" style={{ width: '100%' }}>
            <SearchBar value={searchValue} onChange={onSearchChange} loadOptions={loadOptions} />
          </div>
          {loading ? (
            <Loader src={loadingGif} />
          ) : data.notFound ? (
            <div className="not-found">Not Found 😒</div>
          ) : (
            <>
              <WeatherDisplay data={data} weatherImage={weatherImage} />
              <WeatherDetails data={data} />
            </>
          )}
        </div>
        <MapTile lat={coords.lat} lon={coords.lon} city={coords.city} />

      </div>

      
    </div>
  );
};

export default WeatherApp;
