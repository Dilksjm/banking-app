import axios from 'axios';
import {API_URL} from '../constants';

export async function createAccount(account) {
    const response = await axios.post(`${API_URL}/accounts`, {account: {...account, balance: 0}})

    return response.data
}

export function getAccount(sessionId) {
    return async () => {
        if(sessionId) {
            const response = await axios.post(`${API_URL}/session`, {sessionId: sessionId})

            return response.data
        }
    }
}

export function postTransaction(email) {
    return async (transaction) => {
        const response = await axios.post(`${API_URL}/accounts/${email}/transaction`, {transaction: {...transaction, date: new Date().toISOString()}})

        return response.data
    }
}
