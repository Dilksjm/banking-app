import axios from 'axios';

export async function login(payload) {
    const response = await axios.post(`http://localhost:8080/login`, payload)

    return response.data
}

export async function logout(payload) {
    const response = await axios.post(`http://localhost:8080/logout`, payload)

    return response.data
}
