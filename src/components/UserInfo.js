export default class UserInfo {
    constructor({ nameSelector, aboutSelector }) {
        this._nameElement = document.querySelector(nameSelector);
        this._aboutElement = document.querySelector(aboutSelector);
    }

    getUserInfo() {
        const profile = {
            name: this._nameElement.textContent,
            about: this._aboutElement.textContent
        };
        return profile;
    }

    changeUserInfo(data) {
        this._nameElement.textContent = data.profileName;
        this._aboutElement.textContent = data.profileAbout;
    }
}