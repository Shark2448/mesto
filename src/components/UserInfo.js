export default class UserInfo {
    constructor({ nameSelector, aboutSelector, userAvatar, userId }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
        this._userAvatar = userAvatar;
        this._userId = userId;
    }

    getUserInfo() {
        const profile = {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent
        };
        return profile;
    }

    changeUserInfo(data) {
        this._nameElement.textContent = data.name;
        this._aboutElement.textContent = data.about;
    }

    setUserInfo(data) {
        this.changeUserInfo(data);
        this.changeUserAvatar(data);
        this._userId = data._id;
    }

    changeUserAvatar(data) {
        this._userAvatar.src = data.avatar;
    }
}