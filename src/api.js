import axios from 'axios';

const base = axios.create({ baseURL: 'https://localhost:3000/'});

export const login = async (username, password) => {
    try {
        const response = await base.post('users/login', {username: username, password: password});
        localStorage.setItem('token', response.data.jwt);
        localStorage.setItem('username', username);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response }
    }
}

export const register = async (username, password) => {
    try {
        const response = await base.post('users/register', {username: username, password: password});
        await login(username, password);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response }
    }
}

export const register = async (username, password) => {
    try {
        const response = await base.post('users/register', {username: username, password: password});
        await login(username, password);
        return { success: true };
    } catch (error) {
        return { success: false, error: error.response }
    }
}