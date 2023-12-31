class Api {
  constructor() {
    this._baseURL = `https://api.golmakova.nomoredomainsrocks.ru`
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
  }

  getUserInfo() {
    return fetch(`${this._baseURL}/users/me`, {
      method: "GET",
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkResponse(res))
  }

  getCards() {
    return fetch(`${this._baseURL}/cards`, {
      method: "GET",
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkResponse(res))
  }

  createCard(name, link) {
    return fetch(`${this._baseURL}/cards`, {
      method: "POST",
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        link: link
      })
    })
      .then((res) => this._checkResponse(res))
  }

  deleteCard(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkResponse(res))
  }

  putLike(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: "PUT",
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkResponse(res))
  }

  removeLike(cardID) {
    return fetch(`${this._baseURL}/cards/${cardID}/likes`, {
      method: "DELETE",
      credentials: 'include',
      headers: {
        authorization: this._token
      }
    })
      .then((res) => this._checkResponse(res))
  }

  changeLikeCardStatus(cardID, liked) {
    if (liked) {
      return this.putLike(cardID)
    } else {
      return this.removeLike(cardID)
    }
  }

  setUserInfo(name, about) {
    return fetch(`${this._baseURL}/users/me`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then((res) => this._checkResponse(res))
  }

  updateAvatar(avatar) {
    return fetch(`${this._baseURL}/users/me/avatar`, {
      method: "PATCH",
      credentials: 'include',
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        avatar: avatar
      })
    })
      .then((res) => this._checkResponse(res))
  }
}

const api = new Api()

export default api;
