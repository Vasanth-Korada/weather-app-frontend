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
        if (username.trim() === '' || password.trim() === '' || dob.trim() === '') {
            window.alert('Please fill out all the fields.');
            return;
        }

        try {
            const response = await registerService(username, password, dob);
            if (response && response.status >= 200 && response.status < 300) {
                console.log('Registration successful');
                navigate('/login');
            } else {
                console.error('Registration failed:', response);
                window.alert('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            window.alert('An error occurred. Please try again later.');
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
                style={{ backgroundColor: 'white' }}
                variant="filled"
            />
            <TextField
                label="Password"
                fullWidth
                margin="normal"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ backgroundColor: 'white' }}
                variant="filled"
            />
            <TextField
                fullWidth
                margin="normal"
                label="Date of Birth"
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                inputProps={{ min: '1900-01-01', max: '9999-12-31' }}
                style={{ backgroundColor: 'white' }}
                variant="filled"
            />
            <Button variant="contained" color="primary" fullWidth onClick={handleRegister} style={{ marginTop: '20px' }}>
                Register
            </Button>
        </Container>
    );
};

export default Register;
