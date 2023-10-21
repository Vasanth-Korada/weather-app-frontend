import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function SearchedWeatherDataTable({ weatherData }) {
    return (
        <TableContainer style={{ width: 650 }} component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Temperature</TableCell>
                        <TableCell align="center">Latitude</TableCell>
                        <TableCell align="center">Longitude</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{weatherData.temp}</TableCell>
                        <TableCell align="center">{weatherData.lat}</TableCell>
                        <TableCell align="center">{weatherData.lng}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}
