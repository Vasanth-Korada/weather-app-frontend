import React, { useState, useEffect } from 'react'
import "./styles/WeatherSearch.css"
import { deleteWeatherSearchRecord, getWeatherSearchHistory } from '../../services/WeatherService';
import WeatherSearchHistoryDataTable from './WeatherSearchHistoryDataTable';

export default function WeatherSearchHistory({ refresh }) {
    const [historyData, setHistoryData] = useState([]);

    useEffect(() => {
        const callWeatherSearchHistory = async () => {
            const response = await getWeatherSearchHistory()
            setHistoryData(response.data.data);
        }
        callWeatherSearchHistory()
    }, [refresh])

    const handleDeleteRecord = async (historyData) => {
        const deleteRecordResponse = await deleteWeatherSearchRecord(historyData)
        if (deleteRecordResponse.status === 200) {
            console.log('DELETE request successful:', deleteRecordResponse.data);
            const searchHistoryResponse = await getWeatherSearchHistory()
            setHistoryData(searchHistoryResponse.data.data);
        }
    }

    return (
        <div style={{ marginTop: 24 }} className="weather-search-container">
            {historyData.length !== 0 ? <WeatherSearchHistoryDataTable
                historyData={historyData}
                onDelete={(history) => {
                    handleDeleteRecord(history)
                }}
            /> : <div />}
        </div>
    )
}
