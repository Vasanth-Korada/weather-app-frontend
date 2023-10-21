import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/auth/Login';
import Register from './components/auth/Registration';
import WeatherSearch from "./components/weather/WeatherSearch.js"
import { NotFound, PrivateRoute } from "./utils/utils.js"

const App = () => {
  const setToken = (token) => {
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login setToken={setToken} />} />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/weather_search" element={
          <PrivateRoute>
            <WeatherSearch />
          </PrivateRoute>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
