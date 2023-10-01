import checkResponse from './checkResponse.js';
const BASE_URL = 'https://api.golmakova.nomoredomainsrocks.ru'

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

export const authorize = (email, password) => {
    return request(`${BASE_URL}/signin`, {
        method: 'POST',
        credentials: 'include',
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
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            "Authorization": `Bearer ${token}`
        }
    })
};