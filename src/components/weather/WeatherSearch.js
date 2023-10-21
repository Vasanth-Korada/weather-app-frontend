import React, {useState } from 'react';
import './styles/WeatherSearch.css';
import { TextField, Button } from '@mui/material';
import WeatherSearchHistory from './WeatherSearchHistory';
import Logout from '../auth/Logout';
import SearchedWeatherDataTable from './SearchedWeatherDataTable';
import { createWeatherAPI, handleWeatherSearch } from '../../services/WeatherService';

const WeatherSearch = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = React.useState(null);
  const [refreshHistory, setRefreshHistory] = useState(false);

  const handleSearch = async () => {
    setRefreshHistory(false);
    try {
      const newWeatherData = await handleWeatherSearch(city);
      setWeatherData(newWeatherData);
      await createWeatherHistory(weatherData, city);
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const createWeatherHistory = async (weatherData, city) => {
    const response = await createWeatherAPI(weatherData, city)
    if (response.status >= 200) {
      console.log(`Added ${city} to Weather History`);
      setRefreshHistory(true);
    } else {
      window.alert(`Error Adding ${city} to your Weather Search History`)
    }
  }

  return (
    <div className="weather-search-container">
      <p style={{ textAlign: 'center', fontWeight: 'bolder', marginTop: 34 }} >Weather Wonder</p>
      <TextField className="cityName" placeholder="Enter city name" value={city} onChange={(e) => setCity(e.target.value)} label="Enter City" variant="filled" />
      <Button className="searchWeatherBtn" onClick={() => handleSearch()} variant="contained">GET WEATHER</Button>
      <br />
      {
        weatherData !== null ? <SearchedWeatherDataTable weatherData={weatherData} /> : <div />
      }
      <WeatherSearchHistory refresh={refreshHistory} />
      <br />
      <Logout />
    </div>
  );
}

export default WeatherSearch;

