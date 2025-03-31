const WeatherDisplay = ({ data, weatherImage }) => {
    const currentDate = new Date();
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July",
      "August", "September", "October", "November", "December"];
    const formattedDate = `${daysOfWeek[currentDate.getDay()]}, ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
  
    return (
      <>
        <div className="weather">
          <img src={weatherImage} alt="weather" />
          <div className="weather-type">{data.weather ? data.weather[0].main : null}</div>
          <div className="temp">{data.main ? `${Math.floor(data.main.temp)}°` : null}</div>
        </div>
        <div className="weather-date">
          <p>{formattedDate}</p>
        </div>
      </>
    );
  };
  
  export default WeatherDisplay;
  