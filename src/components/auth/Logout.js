import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutService } from '../../services/AuthService';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        const logoutResponse = await logoutService();
        if (logoutResponse && logoutResponse.status === 200) {
            navigate('/login');
        }
    };

    return (
        <Button style={{ marginTop: 24 }} variant="contained" color="error" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;
