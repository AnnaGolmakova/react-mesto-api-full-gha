import checkResponse from './checkResponse.js';
// const BASE_URL = 'https://auth.nomoreparties.co'
const BASE_URL = 'http://localhost:3000'

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const authorize = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
};

export const register = (email, password) => {
    return request(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
};

export const userInfo = (token) => {
    return request(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
};