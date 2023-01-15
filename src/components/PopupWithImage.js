import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector);
        this._popupPhotoName = this._popup.querySelector('.popup__photo-name');
        this._popupPhotoImg = this._popup.querySelector('.popup__photo-img');
    }

    openPopup(name, link) {
        this._popupPhotoName.textContent = name;
        this._popupPhotoImg.src = link;
        this._popupPhotoImg.alt = name;
        super.openPopup();
    }
}