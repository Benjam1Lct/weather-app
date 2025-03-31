const ForecastTimeline = ({ forecast }) => {
    if (!forecast || forecast.length === 0) return null;
  
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "long",
      });
    };
  
    const formatHour = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };
  
    let currentDay = "";
  
    return (
      <div className="forecast-box">
        <h2 className="forecast-title">Prévisions</h2>
        <div className="forecast-scroll">
          {forecast.map((item, index) => {
            const thisDay = formatDate(item.dt_txt);
            const showDayLabel = thisDay !== currentDay;
            currentDay = thisDay;
  
            const icon = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
            const hour = formatHour(item.dt_txt);
  
            return (
              <div key={index}>
                {showDayLabel && <div className="forecast-day">{thisDay}</div>}
                <div className="forecast-item">
                  <span className="forecast-time">{hour}</span>
                  <img src={icon} alt={item.weather[0].description} />
                  <span className="forecast-temp">{Math.round(item.main.temp)}°C</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };
  
  export default ForecastTimeline;
  