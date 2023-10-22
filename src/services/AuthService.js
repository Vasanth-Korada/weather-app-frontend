import axios from 'axios';
import { LOGIN_API, LOGOUT_API, REGISTER_API } from '../utils/api';

export const loginService = async (username, password) => {
    if (!username || !password) {
        console.error('Login failed: Invalid input');
        return { error: 'Invalid username or password' };
    }
    try {
        const response = await axios.post(LOGIN_API, {
            username,
            password,
        });
        return response;
    } catch (error) {
        console.error('Login failed:', error.response ? error.response.data : error.message);
        return { error: error.response ? error.response.data.message : 'Login failed. Please try again later.' };
    }
}

export const registerService = async ({ username, password, dob }) => {
    if (!username || !password || !dob) {
        console.error('Registration failed: Invalid input');
        return { error: 'All fields are required' };
    }
    try {
        const response = await axios.post(REGISTER_API, {
            username,
            password,
            dob,
        });
        return response;
    } catch (error) {
        console.error('Registration failed:', error.response ? error.response.data : error.message);
        return { error: error.response ? error.response.data.message : 'Registration failed. Please try again later.' };
    }
}

export const logoutService = async () => {
    try {
        const response = await axios.post(LOGOUT_API, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        localStorage.removeItem('token');
        return response;
    } catch (error) {
        console.error('Logout failed:', error.response ? error.response.data : error.message);
        throw error;
    }
}
