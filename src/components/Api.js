export default class Api {
    constructor ({ url, headers }) {
        this._url = url;
        this._headers = headers;
    }

    _handleRes = (res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`)
    };

    getUserInfo () {
        return fetch(this._url + '/users/me', {
            headers: this._headers
        })
        .then(this._handleRes)
    };

    changeUserInfo (data) {
        return fetch(this._url + '/users/me', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: data.profileName,
                about: data.profileAbout
            })
        })
        .then(this._handleRes)
    };

    changeUserAvatar(data) {
        return fetch(this._url + '/users/me/avatar', {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: data.avatarLink
            })
        })
        .then(this._handleRes)
    };
    
    getInitialCards() {
        return fetch(this._url + '/cards', {
            headers: this._headers
        })
        .then(this._handleRes)
    };

    createNewCard(data) {
        return fetch(this._url + '/cards', {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: data.cardName,
                link: data.cardLink
            })
        })
        .then(this._handleRes)
    };

    deleteCard(cardId) {
        return fetch(this._url + '/cards/' + cardId, {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._handleRes)
    };

    likeCard(cardId) {
        return fetch(this._url + '/cards/' + cardId + '/likes', {
            method: 'PUT',
            headers: this._headers,
        })
        .then(this._handleRes)
    };

    dislikeCard(cardId) {
        return fetch(this._url + '/cards/' + cardId + '/likes', {
            method: 'DELETE',
            headers: this._headers,
        })
        .then(this._handleRes)
    }
}