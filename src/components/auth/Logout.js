import React from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { logoutService } from '../../services/AuthService';

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            const logoutResponse = await logoutService();
            if (logoutResponse && logoutResponse.status === 200) {
                console.log('Logout successful.');
                navigate('/login');
            } else {
                console.error('Logout failed. Unexpected response:', logoutResponse);
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Button style={{ marginTop: 24 }} variant="contained" color="error" onClick={handleLogout}>
            Logout
        </Button>
    );
};

export default Logout;
