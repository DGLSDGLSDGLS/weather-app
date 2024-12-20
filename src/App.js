import React, { useState } from "react";
import axios from "axios";
import WeatherCard from "./WeatherCard";
import "./App.css";

const apiKey = "e4e4d33fab5f98bb71f75485b9ab3f99";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function App() {
  const [city, setCity] = useState(""); 
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(false);

  const checkWeather = async () => {
    if (!city) return;

    try {
      const response = await axios.get(`${apiUrl}${city}&appid=${apiKey}`);
      setWeatherData(response.data);
      setError(false);
    } catch (error) {
      setError(true);
      setWeatherData(null);
    }
  };

  return (
    <div className="app">
      <div className="card">
        <div className="search">
          <input
            type="text"
            placeholder="Search City..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={checkWeather}>Search</button>
        </div>

        {error && <div className="error">INVALID CITY NAME</div>}

        {weatherData && !error && (
          <WeatherCard
            weatherData={weatherData}
          />
        )}
      </div>
    </div>
  );
}

export default App;
