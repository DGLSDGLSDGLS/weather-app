import React from "react";
import PropTypes from "prop-types";

const WeatherCard = ({ weatherData }) => {
  const weatherCondition = weatherData.weather[0].main; // Main weather condition
  const weatherDescription = weatherData.weather[0].description; // Detailed description
  const weatherIcon = getWeatherIcon(weatherCondition);

  return (
    <div className="weather">
      <img src={weatherIcon} className="weather-icon" alt={weatherCondition} />
      <h1 className="temp">{Math.round(weatherData.main.temp)}°C</h1>
      <h2 className="cityname">{weatherData.name}</h2>
      <p className="condition">{weatherDescription}</p>
      <div className="details">
        <div className="col">
          <img src={`${process.env.PUBLIC_URL}/icons/humidity.png`} alt="Humidity" />
          <div>
            <p className="humidity">{weatherData.main.humidity}%</p>
            <p>Humidity</p>
          </div>
        </div>
        <div className="col">
          <img src={`${process.env.PUBLIC_URL}/icons/wind.png`} alt="Wind Speed" />
          <div>
            <p className="wind">{weatherData.wind.speed} km/h</p>
            <p>Wind Speed</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getWeatherIcon = (condition) => {
  const normalizedCondition = condition.toLowerCase();

  // Match condition to appropriate icons
  if (normalizedCondition.includes("cloud")) return `${process.env.PUBLIC_URL}/icons/clouds.png`;
  if (normalizedCondition.includes("rain")) return `${process.env.PUBLIC_URL}/icons/rain.png`;
  if (normalizedCondition.includes("clear")) return `${process.env.PUBLIC_URL}/icons/clear.png`;
  if (normalizedCondition.includes("drizzle")) return `${process.env.PUBLIC_URL}/icons/drizzle.png`;
  if (normalizedCondition.includes("mist") || normalizedCondition.includes("fog"))
    return `${process.env.PUBLIC_URL}/icons/mist.png`;
  if (normalizedCondition.includes("snow")) return `${process.env.PUBLIC_URL}/icons/snow.png`;
  if (normalizedCondition.includes("thunderstorm")) return `${process.env.PUBLIC_URL}/icons/thunderstorm.png`;

  // Default icon
  return `${process.env.PUBLIC_URL}/icons/default.png`;
};

// Prop validation
WeatherCard.propTypes = {
  weatherData: PropTypes.shape({
    main: PropTypes.shape({
      temp: PropTypes.number.isRequired,
      humidity: PropTypes.number.isRequired,
    }).isRequired,
    wind: PropTypes.shape({
      speed: PropTypes.number.isRequired,
    }).isRequired,
    weather: PropTypes.arrayOf(
      PropTypes.shape({
        main: PropTypes.string.isRequired,
        description: PropTypes.string,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default WeatherCard;
