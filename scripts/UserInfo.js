export default class UserInfo {
    constructor({ nameElement, aboutElement }) {
        this._nameElement = nameElement;
        this._aboutElement = aboutElement;
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