import React, { useState, useEffect } from 'react';
import "../weather/styles/WeatherSearch.css";
import { deleteWeatherSearchRecord, getWeatherSearchHistory } from '../../services/WeatherService';
import WeatherSearchHistoryDataTable from './WeatherSearchHistoryDataTable';

export default function WeatherSearchHistory({ refresh }) {
    const [historyData, setHistoryData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const callWeatherSearchHistory = async () => {
            setIsLoading(true);
            try {
                const response = await getWeatherSearchHistory();
                if (response && response.data && Array.isArray(response.data.data)) {
                    setHistoryData(response.data.data);
                } else {
                    console.error("Invalid response format from getWeatherSearchHistory");
                }
            } catch (err) {
                setError("Failed to fetch search history.");
            } finally {
                setIsLoading(false);
            }
        };
        callWeatherSearchHistory();
    }, [refresh]);

    const handleDeleteRecord = async (historyData) => {
        try {
            const deleteRecordResponse = await deleteWeatherSearchRecord(historyData);
            if (deleteRecordResponse && deleteRecordResponse.status === 200) {
                console.log('DELETE request successful:', deleteRecordResponse.data);
                const searchHistoryResponse = await getWeatherSearchHistory();
                if (searchHistoryResponse && searchHistoryResponse.data && Array.isArray(searchHistoryResponse.data.data)) {
                    setHistoryData(searchHistoryResponse.data.data);
                } else {
                    console.error("Invalid response format from getWeatherSearchHistory");
                }
            } else {
                console.error("Failed to delete record:", deleteRecordResponse);
            }
        } catch (err) {
            console.error("Error during delete:", err);
            setError("Failed to delete record.");
        }
    };

    return (
        <div style={{ marginTop: 24 }} className="weather-search-container">
            {isLoading ? (
                <div>Loading...</div>
            ) : error ? (
                <div>{error}</div>
            ) : historyData.length !== 0 ? (
                <WeatherSearchHistoryDataTable
                    historyData={historyData}
                    onDelete={handleDeleteRecord}
                />
            ) : (
                <div>No search history available.</div>
            )}
        </div>
    );
}
