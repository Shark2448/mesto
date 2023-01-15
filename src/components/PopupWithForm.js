import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
    constructor(popupSelector, handleFormSubmit, formSelector) {
        super(popupSelector);
        this._formContainer = this._popup.querySelector('.popup__container');
        this._handleFormSubmit = handleFormSubmit;
        this._inputList = this._formContainer.querySelectorAll('.popup__field');
        this._form = this._formContainer.querySelector(formSelector)
    }

    _getInputValues() {
        const formElements = {};

        this._inputList.forEach(input => {
            formElements[input.name] = input.value;
        });
        
        return formElements;
    }

    setEventListeners() {
        super.setEventListeners();

        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    close() {
        super.closePopup();
        this._form.reset();
    }
}