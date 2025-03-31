import { useEffect, useState } from 'react';
import sunny from './assets/images/sunny.png';
import cloudy from './assets/images/cloudy.png';
import rainy from './assets/images/rainy.png';
import snowy from './assets/images/snowy.png';
import moon from './assets/images/moon.png';
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

import { fetchForecast } from './utils/fetchForecast';
import ForecastTimeline from './components/ForecastTimeline';

import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';
import WeatherDetails from './components/WeatherDetails';
import Loader from './components/Loader';
import MapTile from './components/MapTile';

const WeatherApp = () => {
  const [isBlurAnimating, setIsBlurAnimating] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [cityImage, setCityImage] = useState(null);
  const [forecast, setForecast] = useState([]);
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
      const forecastData = await fetchForecast(defaultLat, defaultLon);
      setForecast(forecastData);
      triggerBlurTransition(getBackgroundForWeather(defaultData));
      setLoading(false);
    };
    fetchDefaultWeather();
  }, []);


  const getLocalHour = (weatherData) => {
    if (!weatherData?.dt || !weatherData?.timezone) return new Date().getUTCHours();
  
    const utc = weatherData.dt + weatherData.timezone; // timestamp en secondes
    const localDate = new Date(utc * 1000);
  
    return localDate.getUTCHours(); // ← on utilise getUTCHours car on a déjà appliqué le fuseau
  };
  
  
  let weatherImage = null;
  if (data.weather) {
    const weatherMain = data.weather[0].main;
    const hour = getLocalHour(data);

    if (weatherMain === "Clear" && (hour >= 22 || hour < 4)) {
      weatherImage = moon;
    } else {
      weatherImage = weatherImages[weatherMain];
    }
  }

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
    const forecastData = await fetchForecast(lat, lon);
    setForecast(forecastData);
    triggerBlurTransition(getBackgroundForWeather(weatherData));

    setLoading(false);
  };

  const getBackgroundForWeather = (weatherData) => {
    if (!weatherData || !weatherData.main || !weatherData.weather) return green;
    const hour = getLocalHour(weatherData);
    console.log(hour);
  
    // ⏰ Priorité : ambiance selon l'heure
    if (hour >= 0 && hour <= 4) return night;
    if (hour >= 5 && hour <= 7) return sunrise;
    if (hour >= 8 && hour <= 10) return morning;
    if (hour >= 11 && hour <= 13) return yellow;
    if (hour >= 14 && hour <= 17) return summer;
    if (hour >= 18 && hour <= 19) return green;
    if (hour >= 20 && hour <= 21) return cold;
    if (hour >= 22 && hour <= 23) return evening;
  
    // 🌫️ Par défaut
    return green;
  };

  const triggerBlurTransition = (newImage) => {
    setIsBlurAnimating(true);
  
    // ⏳ attendre le milieu de l'animation pour changer l’image
    setTimeout(() => {
      setCityImage(newImage);
    }, 300); // moitié de l’animation
  
    // 🔁 fin de l’animation
    setTimeout(() => {
      setIsBlurAnimating(false);
    }, 700); // durée totale
  };
  
  

  return (
    <div className="Container">
        

        {/* BACKGROUND flouté */}
      <div className="background-wrapper">
        <img
          src={cityImage}
          alt="background"
          className={`background-blur ${isBlurAnimating ? 'blur-animating' : ''}`}
          />
      </div>

      <div className="bento">
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
        <div className='rightBox'>
          <MapTile lat={coords.lat} lon={coords.lon} city={coords.city} />
          <ForecastTimeline forecast={forecast} />
        </div>
      </div>

      
    </div>
  );
};

export default WeatherApp;
