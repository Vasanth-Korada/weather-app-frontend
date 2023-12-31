import React from 'react';
import IconButton from '@mui/material/Icon';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import { updateWeatherDataService } from "../../services/WeatherService";

export default function WeatherSearchHistoryDataTable({ historyData, onDelete }) {
    const handleUpdate = async (id, field, value) => {
        try {
            await updateWeatherDataService(id, field, value);
            console.log(`Updated ${field} for ID ${id} successfully.`);
        } catch (error) {
            console.error(`Error updating ${field} for ID ${id}:`, error);
        }
    };

    return (
        <TableContainer style={{ maxHeight: '400px', overflowY: 'auto', overflow: 'scroll' }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">City</TableCell>
                        <TableCell align="left">Temperature</TableCell>
                        <TableCell align="left">Latitude</TableCell>
                        <TableCell align="left">Longitude</TableCell>
                        <TableCell align="center">DEL</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {historyData.map((history) => (
                        <TableRow key={history.id}>
                            <TableCell align="center">{history.city}</TableCell>
                            <TableCell align="center">
                                <TextField
                                    defaultValue={history.temp}
                                    onBlur={(e) => handleUpdate(history.id, 'temp', e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    defaultValue={history.lat}
                                    onBlur={(e) => handleUpdate(history.id, 'lat', e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <TextField
                                    defaultValue={history.lng}
                                    onBlur={(e) => handleUpdate(history.id, 'lng', e.target.value)}
                                />
                            </TableCell>
                            <TableCell align="center">
                                <IconButton onClick={() => onDelete(history)}>delete</IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
