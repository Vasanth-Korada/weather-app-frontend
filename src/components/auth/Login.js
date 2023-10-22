import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { loginService } from '../../services/AuthService';

const Login = ({ setToken }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        if (localStorage.getItem("token") !== null) {
            navigate("/weather_search")
        }
    }, [navigate]);

    const handleLogin = async () => {
        if (username.trim() === "" || password.trim() === "") {
            window.alert("Invalid username or password");
            return;
        }
        try {
            const response = await loginService(username, password);
            if (response && response.status === 200) {
                setToken(response.data);
                navigate('/weather_search');
            } else {
                window.alert(response.data.error);
            }
        } catch (error) {
            console.error("Login error:", error);
            window.alert("Error during login");
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" align="center" style={{ margin: '20px 0' }}>
                Login
            </Typography>
            <TextField
                label="Username"
                fullWidth
                margin="normal"
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
            <Button style={{ height: "48px", marginTop: '8px', }} variant="contained" color="primary" fullWidth onClick={handleLogin}>
                Login
            </Button>
            <br />
            <p onClick={() => {
                navigate('/register');
            }} style={{
                display: 'block',
                textAlign: 'center',
                marginTop: '20px',
                textDecoration: 'underline',
                cursor: 'pointer',
            }}>Register</p>
        </Container>
    );
};

export default Login;
