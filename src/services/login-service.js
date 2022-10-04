import axios from 'axios';
import {API_URL} from '../constants';

export async function login(payload) {
    const response = await axios.post(`${API_URL}/login`, payload)

    return response.data
}

export async function logout(payload) {
    const response = await axios.post(`${API_URL}/logout`, payload)

    return response.data
}
