import axios from 'axios';
import { API_BASE_URL, OPEN_WEATHER_APP_ID, OPEN_WEATHER_METRIC_TYPE } from "../utils/constants"
import { CREATE_WEATHER_API, DELETE_WEATHER_API, SEARCH_HISTORY_API } from '../utils/api';

export const handleWeatherSearch = async (city) => {
    const openWeatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${OPEN_WEATHER_APP_ID}&units=${OPEN_WEATHER_METRIC_TYPE}`;
    try {
        const response = await axios.get(openWeatherAPI)
        const newWeatherData = {
            id: 1,
            temp: response.data["main"]["temp"],
            lat: response.data["coord"]["lat"],
            lng: response.data["coord"]["lon"]
        };
        return newWeatherData;
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
};

export const createWeatherAPI = async (weatherData, city) => {
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
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
                }
            });
            return response;
        } catch (error) {
            console.error("Error creating weather history:", error);
        }
    } else {
        console.log("Invalid weather data");
    }
}

export const getWeatherSearchHistory = async () => {
    try {
        const response = await axios.get(SEARCH_HISTORY_API, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        return response
    } catch (error) {
        console.error('Error fetching history data:', error);
    }
}

export const deleteWeatherSearchRecord = async (historyData) => {
    try {
        if (!historyData || !historyData.id) {
            console.error("Invalid history data:", historyData);
            return;
        }
        const response = await axios.delete(`${DELETE_WEATHER_API}/${historyData.id}`, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        })
        return response
    } catch (error) {
        console.error('Delete failed:', error);
    }
}

export const updateWeatherDataService = async (id, field, value) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/api/update_weather/${id}`, { [field]: value }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            }
        });
        if (response.status !== 200) {
            console.error('Update failed:', response.data);
            window.alert("Update failed")
        }
    } catch (error) {
        console.error('Update error:', error);
        window.alert(error)
    }
}