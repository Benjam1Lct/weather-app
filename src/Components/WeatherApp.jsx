import sunny from '../assets/images/sunny.png';
import cloudy from '../assets/images/cloudy.png';
import rainy from '../assets/images/rainy.png';
import snowy from '../assets/images/snowy.png';
import { useState } from'react';
import { useEffect } from 'react';
import loadingGif from '../assets/images/loading.gif'
import { createClient } from 'pexels';


const WeatherApp = () => {

    const [data, setData] = useState({})
    const [location, setLocation] = useState("")
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false)
    const [cityImage, setCityImage] = useState(null);
    const [cityList, setCityList] = useState([]);
    const api_key = '8a85afb9c508e181779be90a10d2bc12'
    const pexelsClient = createClient('gjOiqujyTqmRLSok09mU613oy9zyoQPcu4sUdmXzLhiwbsIkXpL1lK9W'); // remplace par ta vraie clé

    useEffect(() => {
        const loadCityData = async () => {
            const res = await fetch('../assets/cities.json');
            const data = await res.json();
        
            // Extrait juste les noms de ville
            const names = data.map(entry => entry.name);
            setCityList(names);
          };

        const fetchDefaultWeather = async () => {
            setLoading(true)
            const defaultLocation = "Nantes "
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${defaultLocation}&units=Metric&appid=${api_key}`
            const res = await fetch(url)
            const defaultData = await res.json()
            setData(defaultData)
            fetchCityImage(defaultLocation);
            setLoading(false)
        }
    
        loadCityData();
        fetchDefaultWeather()
    }, [])

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
    


    const handleInputChange = (e) => {
        const value = e.target.value;
        setLocation(value)

        const filtered = cityList.filter(city =>
            city.toLowerCase().startsWith(value.toLowerCase())
          ).slice(0, 5); // max 5 suggestions
        
          setSuggestions(filtered);
    }

    const search = async () => {
        if (location.trim() !== "") {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=Metric&appid=${api_key}`
            const res = await fetch(url)
            const searchData = await res.json()
            console.log(searchData)
            if (searchData.cod !== 200) {
                setData({notFound: true})
            } else {
                setData(searchData)
                fetchCityImage(location);
                setLocation("")
            }
            setLoading(false)           
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            search()
        }
    }

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
            <div className="search">
                <div className="search-top">
                    <i className="fa-solid fa-location-dot"></i>
                    <div className="location">{data.name}</div>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder="Enter Location" value={location} onChange={handleInputChange} onKeyDown={handleKeyDown}/>
                    <i className="fa-solid fa-magnifying-glass" onClick={search}></i>
                </div>
                <div className="suggestions-list">
                    {suggestions.map((city, idx) => (
                        <div
                        key={idx}
                        className="suggestion-item"
                        onClick={() => {
                            setLocation(city);
                            setSuggestions([]);
                            search(city);
                        }}
                        >
                        {city}
                        </div>
                    ))}
                </div>
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
                        <div className="data-name">Humidity</div>
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