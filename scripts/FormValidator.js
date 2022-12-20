export default class FormValidator {
    constructor (selectors, formElement) {
        this._selectors = selectors;
        this._formElement = formElement;
        this._inputList = Array.from(this._formElement.querySelectorAll(this._selectors.inputSelector));
        this._buttonElement = this._formElement.querySelector(this._selectors.submitButtonSelector);
    }

    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.add(this._selectors.textErrorClass);
        errorElement.classList.add(this._selectors.errorClass);
        errorElement.textContent = errorMessage;
    };

    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.name}-error`);
        inputElement.classList.remove(this._selectors.textErrorClass);
        errorElement.classList.remove(this._selectors.errorClass);
        errorElement.textContent = ' ';
    };

    _checkInputValidity = (inputElement) => {
        if(!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _toggleButtonState = () => {
        if(this._hasInvalidInput()) {
            this._buttonElement.classList.add(this._selectors.disabledButtonClass);
            this._buttonElement.disabled = true;
        } else {
            this._buttonElement.classList.remove(this._selectors.disabledButtonClass);
            this._buttonElement.disabled = false;
        }
    };

    _setEventListeners = () => {
        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._toggleButtonState();
                this._checkInputValidity(inputElement);
            });
        });
    };

    enableValidation = () => {
        this._formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        this._setEventListeners();
    };

    resetValidation = () => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement)
          });
    }
}