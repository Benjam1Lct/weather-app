const WeatherDetails = ({ data }) => {
    return (
      <div className="weather-data">
        <div className="humidity">
          <div className="data-name">Humidity</div>
          <i className="fa-solid fa-droplet"></i>
          <div className="data">{data.main ? data.main.humidity : null}%</div>
        </div>
        <div className="wind">
          <div className="data-name">Wind</div>
          <i className="fa-solid fa-wind"></i>
          <div className="data">{data.wind ? `${Math.floor(data.wind.speed)}` : null} km/h</div>
        </div>
      </div>
    );
  };
  
  export default WeatherDetails;
  