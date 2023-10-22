import React, { useState } from 'react';
import './styles/WeatherSearch.css';
import { TextField, Button } from '@mui/material';
import WeatherSearchHistory from '../history/WeatherSearchHistory';
import Logout from '../auth/Logout';
import SearchedWeatherDataTable from './SearchedWeatherDataTable';
import { createWeatherAPI, handleWeatherSearch } from '../../services/WeatherService';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [refreshHistory, setRefreshHistory] = useState(false);

  const handleSearch = async () => {
    setRefreshHistory(false);
    if (!city) {
      console.error("City is required.");
      return;
    }

    try {
      const newWeatherData = await handleWeatherSearch(city);
      if (newWeatherData) {
        setWeatherData(newWeatherData);
        await createWeatherHistory(newWeatherData, city);
      } else {
        console.error("Weather data not available for the city:", city);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const createWeatherHistory = async (weatherData, city) => {
    try {
      const response = await createWeatherAPI(weatherData, city);
      if (response && response.status >= 200 && response.status < 300) {
        console.log(`Added ${city} to Weather History`);
        setRefreshHistory(true);
      } else {
        console.error(`Error Adding ${city} to your Weather Search History. Status code: ${response.status}`);
        window.alert(`Error Adding ${city} to your Weather Search History`);
      }
    } catch (error) {
      console.error(`Failed to add ${city} to Weather History:`, error);
      window.alert(`Error Adding ${city} to your Weather Search History`);
    }
  };

  return (
    <div className="weather-search-container">
      <p style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: 34 }} >Weather Wonder</p>
      <TextField className="cityName" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} label="Enter City" variant="filled" />
      <Button className="searchWeatherBtn" onClick={handleSearch} variant="contained">GET WEATHER</Button>
      <br />
      {
        weatherData ? <SearchedWeatherDataTable weatherData={weatherData} /> : null
      }
      <WeatherSearchHistory refresh={refreshHistory} />
      <br />
      <Logout />
    </div>
  );
}

export default WeatherSearch;
