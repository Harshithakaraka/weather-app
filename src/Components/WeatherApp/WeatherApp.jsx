import React, { useState, useEffect } from 'react';
import './WeatherApp.css';
import clear from '../assets/clear.png'
import drizzle from '../assets/drizzle.png'
import rain from '../assets/rain.png'
import snow from '../assets/snow.png'
import searchIcon from '../assets/search.png';
import cloudy from '../assets/cloud.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [weatherIcon, setWeatherIcon] = useState(cloudy); // Default weather icon

  const api_key = "f9d49c8c66faa0d52b4fe8b3d3c732b3";

  useEffect(() => {
    if (weatherData) {
      // Update the weather icon based on the weather condition
      const iconCode = weatherData.weather[0].icon;
      switch (iconCode) {
        case '01d': // clear sky (day)
          setWeatherIcon(clear);
          break;
        case '01n': // clear sky (night)
          setWeatherIcon(clear);
          break;
        case '02d': // few clouds (day)
        case '02n': // few clouds (night)
          setWeatherIcon(clear);
          break;
        case '03d': // scattered clouds (day)
        case '03n': // scattered clouds (night)
          setWeatherIcon(cloudy);
          break;
        case '04d': // broken clouds (day)
        case '04n': // broken clouds (night)
          setWeatherIcon(cloudy);
          break;
        case '09d': // shower rain (day)
        case '09n': // shower rain (night)
          setWeatherIcon(rain);
          break;
        case '10d': // rain (day)
        case '10n': // rain (night)
          setWeatherIcon(rain);
          break;
        case '11d': // thunderstorm (day)
        case '11n': // thunderstorm (night)
          setWeatherIcon(snow);
          break;
        case '13d': // snow (day)
        case '13n': // snow (night)
          setWeatherIcon(snow);
          break;
        default:
          setWeatherIcon(cloudy); // Default to cloudy if unknown weather code
          break;
      }
    }
  }, [weatherData]);

  const handleSearch = async () => {
    if (!city) return;

    try {
      const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`);
      const data = await response.json();
      setWeatherData(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  return (
    <div className='container'>
      <div className='top-bar'>
        <input
          type="text"
          placeholder='Enter city'
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <div className="search-icon" onClick={handleSearch}>
          <img src={searchIcon} alt="Search" />
        </div>
      </div>
      {weatherData && (
        <div className="weather-details">
          <div className="weather-image">
            <img src={weatherIcon} alt='Weather' />
          </div>
          <div className="weather-info">
            <div className="weather-temp">{Math.round(weatherData.main.temp - 273.15)}°C</div>
            <div className="weather-location">{weatherData.name}</div>
            <div className="data-container">
              <div className="element">
                <img src={humidityIcon} alt='' className='icon' />
                <div className="data">
                  <div className="humidity-percent">{weatherData.main.humidity}%</div>
                  <div className="text">Humidity</div>
                </div>
              </div>
              <div className="element">
                <img src={windIcon} alt='' className='icon' />
                <div className="data">
                  <div className="wind-rate">{weatherData.wind.speed} m/s</div>
                  <div className="text">Wind Speed</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
