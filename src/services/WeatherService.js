import axios from 'axios';
import { API_BASE_URL, OPEN_WEATHER_APP_ID, OPEN_WEATHER_METRIC_TYPE } from "../utils/constants";
import { CREATE_WEATHER_API, DELETE_WEATHER_API, SEARCH_HISTORY_API } from '../utils/api';

export const handleWeatherSearch = async (city) => {
    if (!city) {
        console.error("City name is required.");
        return;
    }

    const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_APP_ID}&units=${OPEN_WEATHER_METRIC_TYPE}`;
    try {
        const response = await axios.get(openWeatherAPI);
        if (!response.data) {
            throw new Error("No data received from weather API.");
        }

        const newWeatherData = {
            temp: response.data["main"]["temp"],
            lat: response.data["coord"]["lat"],
            lng: response.data["coord"]["lon"]
        };
        return newWeatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
        window.alert("Unable to fetch weather data.");
    }
};

export const createWeatherAPI = async (weatherData, city) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing or invalid.");
        window.alert("Please login to proceed.");
        return;
    }

    if (weatherData?.temp && weatherData?.lat && weatherData?.lng) {
        try {
            const response = await axios.post(CREATE_WEATHER_API, {
                temp: weatherData.temp.toString(),
                city: city,
                lat: weatherData.lat.toString(),
                lng: weatherData.lng.toString()
            }, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error creating weather history:", error);
            window.alert("Failed to save weather data.");
        }
    } else {
        console.error("Invalid weather data:", weatherData);
        window.alert("Invalid weather data.");
    }
};

export const getWeatherSearchHistory = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing or invalid.");
        window.alert("Please login to view history.");
        return;
    }

    try {
        const response = await axios.get(SEARCH_HISTORY_API, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Error fetching history data:', error);
        window.alert("Failed to fetch weather search history.");
    }
};

export const deleteWeatherSearchRecord = async (historyData) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing or invalid.");
        window.alert("Please login to delete record.");
        return;
    }

    try {
        if (!historyData || !historyData.id) {
            throw new Error("Invalid history data.");
        }
        const response = await axios.delete(`${DELETE_WEATHER_API}/${historyData.id}`, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        console.error('Delete failed:', error);
        window.alert("Failed to delete weather search record.");
    }
};

export const updateWeatherDataService = async (id, field, value) => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token is missing or invalid.");
        window.alert("Please login to update record.");
        return;
    }

    try {
        const response = await axios.put(`${API_BASE_URL}/api/update_weather/${id}`, { [field]: value }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.status !== 200) {
            console.error('Update failed:', response.data);
            window.alert("Update failed.");
        }
    } catch (error) {
        console.error('Update error:', error);
        window.alert("Failed to update weather data.");
    }
};
