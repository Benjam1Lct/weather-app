const WeatherDetails = ({ data }) => {
    return (
      <div className="weather-data">
        <div className="humidity">
          <div className="data-name">Humidity</div>
          <img src="https://em-content.zobj.net/source/microsoft/379/droplet_1f4a7.png" loading="lazy" alt="15.1" width="30px" height="30px" style={{filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))'}} />
          <div className="data">{data.main ? data.main.humidity : null}%</div>
        </div>
        <div className="wind">
          <div className="data-name">Wind</div>
          <img src="https://icons.iconarchive.com/icons/microsoft/fluentui-emoji-3d/128/Dashing-Away-3d-icon.png" loading="lazy" alt="15.1" width="30px" height="30px" style={{filter: 'drop-shadow(2px 4px 6px rgba(0, 0, 0, 0.3))'}} />
          <div className="data">{data.wind ? `${Math.floor(data.wind.speed)}` : null} km/h</div>
        </div>
      </div>
    );
  };
  
  export default WeatherDetails;
  