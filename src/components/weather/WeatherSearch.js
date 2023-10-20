import React, { useState } from 'react';
import './styles/WeatherSearch.css';

const WeatherSearch = () => {
  const [city, setCity] = useState('');

  const handleSearch = () => {
    console.log("Handle Weather Search Here");
  };

  return (
    <div className="weather-search-container">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Search
      </button>
    </div>
  );
};

export default WeatherSearch;
