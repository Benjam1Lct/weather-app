import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';
import { useState } from'react';
import { useEffect } from 'react';
import loadingGif from '../assets/images/loading.gif'
import { createClient } from 'pexels';
import { AsyncPaginate } from 'react-select-async-paginate';


const WeatherApp = () => {

    const [data, setData] = useState({})
    const [loading, setLoading] = useState(false)
    const [cityImage, setCityImage] = useState(null);
    const [searchValue, setSearchValue] = useState({
        value: "47.2184 -1.5536", // latitude longitude de Nantes
        label: "Nantes, FR"
      });
          const api_key = '8a85afb9c508e181779be90a10d2bc12'
    const pexelsClient = createClient('gjOiqujyTqmRLSok09mU613oy9zyoQPcu4sUdmXzLhiwbsIkXpL1lK9W')
    const GEO_API_OPTIONS = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '4f0dcce84bmshac9e329bd55fd14p17ec6fjsnff18c2e61917',
          'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
        },
      };
    const GEO_API_URL = 'https://wft-geo-db.p.rapidapi.com/v1/geo';


    useEffect(() => {
        const fetchDefaultWeather = async () => {
          setLoading(true);
          const defaultLat = 47.2184;
          const defaultLon = -1.5536;
      
          const url = `https://api.openweathermap.org/data/2.5/weather?lat=${defaultLat}&lon=${defaultLon}&appid=${api_key}&units=metric`;
          const res = await fetch(url);
          const defaultData = await res.json();
      
          setData(defaultData);
          fetchCityImage("Nantes, FR"); // pour l'image
          setLoading(false);
        };
      
        fetchDefaultWeather();
      }, []);
      

    const fetchCities = async (input) => {
        try {
          const response = await fetch(
            `${GEO_API_URL}/cities?minPopulation=10000&namePrefix=${input}`,
            GEO_API_OPTIONS
          );
          const data = await response.json();
          return data;
        } catch (error) {
          console.log(error);
          return { data: [] };
        }
      };
      
      const loadOptions = async (inputValue) => {
        const citiesList = await fetchCities(inputValue);
      
        const cleaned = citiesList.data.filter(city =>
          !city.name.toLowerCase().includes("arrondissement")
        );
      
        // Injection manuelle de Paris, FR si l'utilisateur tape "par"
        const includeParis = inputValue.toLowerCase().startsWith("par");
        if (includeParis) {
          const paris = {
            name: "Paris",
            countryCode: "FR",
            latitude: 48.8566,
            longitude: 2.3522,
          };
          cleaned.unshift(paris);
        }
      
        // Supprimer les doublons (même nom + pays)
        const unique = cleaned.filter((city, index, self) =>
          index === self.findIndex(c =>
            c.name === city.name && c.countryCode === city.countryCode
          )
        );
      
        // Trier les villes FR d'abord
        const sorted = unique.sort((a, b) => {
          if (a.countryCode === 'FR' && b.countryCode !== 'FR') return -1;
          if (a.countryCode !== 'FR' && b.countryCode === 'FR') return 1;
          return 0;
        });
      
        const sliced = sorted.slice(0, 10);
      
        return {
          options: sliced.map(city => ({
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }))
        };
      };
      
    
    const onSearchChange = async (selectedOption) => {
        setSearchValue(selectedOption);
        
        if (!selectedOption) return;
        
        const [lat, lon] = selectedOption.value.split(' ');
        
        setLoading(true);
        const weatherRes = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`
        );
        const weatherData = await weatherRes.json();
        setData(weatherData);
        fetchCityImage(selectedOption.label);
        setLoading(false);
    };
      
      

    const fetchCityImage = async (cityName) => {
        const refinedQuery = `${cityName} city landscape monument`; // or "skyline", "aerial view", etc.
        try {
            const res = await pexelsClient.photos.search({ query: refinedQuery, per_page: 1 });
            if (res.photos && res.photos.length > 0) {
                const img = new Image();
                img.src = res.photos[0].src.large2x;
                img.onload = () => {
                    setCityImage(img.src);
                };
            } else {
                setCityImage(null);
            }
        } catch (err) {
            console.error("Erreur récupération image Pexels :", err);
            setCityImage(null);
        }
    };

    const weatherImages = {
        Clear: sunny,
        Clouds: cloudy,
        Rain: rainy,
        Snow: snowy,
        Haze: cloudy,
        Mist: cloudy,
    }

    const weatherImage = data.weather ? weatherImages[data.weather[0].main] : null;

    const backgroundImages = {
        Clear: 'linear-gradient(to right, #f3b07c, #fcd283)',
        Clouds: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Rain: 'linear-gradient(to right, #5bc8fb, #80eaff)',
        Snow: 'linear-gradient(to right, #aff2ff, #fff2ff)',
        Haze: 'linear-gradient(to right, #57d6d4, #71eeec)',
        Mist: 'linear-gradient(to right, #57d6d4, #71eeec)',
    }
    
    const backgroundImage = data.weather ? backgroundImages[data.weather[0].main] : 'linear-gradient(to right, #f3b07c, #fcd283)';

    const currentDate = new Date()

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    const dayOfWeek = daysOfWeek[currentDate.getDay()]
    const month = months[currentDate.getMonth()]
    const dayOfMonth = currentDate.getDate()

    const formattedDate = `${dayOfWeek}, ${dayOfMonth} ${month}`

  return (
    <div className="Container" 
    style={{
        backgroundImage: cityImage ? `url(${cityImage})` : backgroundImage,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
    }}>
        <div className="weather-app" >
        <div className="search" style={{width: '100%'}}>
            <AsyncPaginate
                placeholder="Search for cities"
                debounceTimeout={500}
                value={searchValue}
                onChange={onSearchChange}
                loadOptions={loadOptions}
                styles={{
                control: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.3)',
                    padding: '5px',
                    color: '#18181a',
                    width: '100%',
                    fontSize: '1.5rem'
                }),
                input: (base) => ({ ...base, color: '#18181a' }),
                placeholder: (base) => ({ ...base, color: '#18181a' }),
                singleValue: (base) => ({ ...base, color: '#18181a' }),
                menu: (base) => ({
                    ...base,
                    backgroundColor: 'rgba(255,255,255,0.9)',
                    backdropFilter: 'blur(6px)',
                }),
                }}
            />
            </div>
            {loading ? (<img className='loader' src={loadingGif} alt='loading'/>) :  data.notFound ? (<div className='not-found'>Not Found 😒</div>) : <>
                <div className="weather">
                    <img src={weatherImage} alt={sunny} />
                    <div className="weather-type">{data.weather ? data.weather[0].main : null} </div>
                    <div className="temp">{data.main ? `${Math.floor(data.main.temp)}° ` : null}</div>
                </div>
                <div className="weather-date">
                    <p>{formattedDate}</p>
                </div>
                <div className="weather-data">
                    <div className="humidity">
                        <div className="data-name">Humidity</div>
                        <i className="fa-solid fa-droplet"></i>
                        <div className="data">{data.main ? data.main.humidity : null}%</div>
                    </div>

                    <div className="wind">
                        <div className="data-name">Wind</div>
                        <i className="fa-solid fa-wind"></i>
                        <div className="data">{data.wind ? `${Math.floor(data.wind.speed)}`: null} km/h</div>
                    </div>
                </div>
            </>}
        </div>
    </div>
  )
}

export default WeatherApp