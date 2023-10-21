import React, { useState } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { registerService } from '../../services/AuthService';

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [dob, setDob] = useState('');

    const handleRegister = async () => {
        const response = await registerService(username, password, dob)
        if (response.status >= 200) {
            console.log('Registration successful');
            navigate('/login');
        }
    };

    const formatDate = (inputDate) => {
        const date = new Date(inputDate);
        if (!isNaN(date.getTime())) {
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        } else {
            console.error('Invalid date:', inputDate);
            return inputDate;
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
                Register
            </Typography>
            <TextField
                label="Username"
                fullWidth
                margin="normal"
                type='email'
                placeholder='Enter your email'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
                fullWidth
                margin="normal"
                type="date"
                value={dob}
                onChange={(e) => {
                    const formattedDate = formatDate(e.target.value);
                    console.log(formattedDate);
                    setDob(formattedDate)
                }}
                inputProps={{ min: '1900-01-01', max: '9999-12-31' }}
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister}>
                Register
            </Button>
        </Container>
    );
};

export default Register;
