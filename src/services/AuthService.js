import axios from 'axios';
import { LOGIN_API, LOGOUT_API, REGISTER_API } from '../utils/api';

export const loginService = async (username, password) => {
    try {
        const response = await axios.post(LOGIN_API, {
            username,
            password,
        });
        return response
    } catch (error) {
        console.error('Login failed:', error);
    }
}

export const registerService = async ({ username, password, dob }) => {
    try {
        const response = await axios.post(REGISTER_API, {
            username,
            password,
            dob,
        });
        return response
    } catch (error) {
        console.error('Registration failed:', error);
    }
}

export const logoutService = async () => {
    try {
        const response = await axios.post(LOGOUT_API, {}, {
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            }
        });
        console.log(response)
        localStorage.removeItem('token');
        return response
    } catch (error) {
        console.error('Logout failed:', error);
        throw error;
    }
}