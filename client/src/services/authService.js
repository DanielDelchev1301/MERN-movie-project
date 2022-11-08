import axios from 'axios';

export async function registerUser(userData) {
    return await axios.post('/auth/register', userData);
}

export async function loginUser(userData) {
    return await axios.post('/auth/login', userData);
}

export async function getUser(userId) {
    return await axios.post('/auth/get-user', userId);
}