import axios from 'axios';

export async function createAccount(account) {
    const response = await axios.post(`http://localhost:8080/accounts`, {account: {...account, balance: 0}})

    return response.data
}

export function getAccount(sessionId) {
    return async () => {
        if(sessionId) {
            const response = await axios.post(`http://localhost:8080/session`, {sessionId: sessionId})

            return response.data
        }
    }
}

export function postTransaction(email) {
    return async (transaction) => {
        const response = await axios.post(`http://localhost:8080/accounts/${email}/transaction`, {transaction: {...transaction, date: new Date().toISOString()}})

        return response.data
    }
}
