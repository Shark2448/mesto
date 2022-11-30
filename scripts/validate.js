const selectorValidator = {
  formSelector: ".popup__container",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__save-button",
  disabledButtonClass: "popup__save-button_disabled",
  textErrorClass: "popup__error-text",
  errorClass: "popup__error-text_invalid",
};

const showInputError = (formElement, inputElement, errorMessage, textErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.add(textErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = (formElement, inputElement, textErrorClass, errorClass) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  inputElement.classList.remove(textErrorClass);
  inputElement.classList.remove(errorClass);
  errorElement.textContent = " ";
};

const checkInputValidity = (formElement, inputElement, textErrorClass, errorClass) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, textErrorClass, errorClass);
  } else {
    hideInputError(formElement, inputElement, textErrorClass, errorClass);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, disabledButtonClass) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(disabledButtonClass);
    buttonElement.disabled = true;  
  } else {
    buttonElement.classList.remove(disabledButtonClass);
    buttonElement.disabled = false;
  }
};

const setEventListeners = (formElement, disabledButtonClass, textErrorClass, errorClass) => {
  const inputList = Array.from(formElement.querySelectorAll(".popup__field"));
  const buttonElement = formElement.querySelector(".popup__save-button");

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      checkInputValidity(formElement, inputElement, textErrorClass, errorClass);
      toggleButtonState(inputList, buttonElement, disabledButtonClass);
    });
  });
};

const enableValidation = (formSelector, disabledButtonClass, textErrorClass, errorClass) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, disabledButtonClass, textErrorClass, errorClass);
  });
};

let {formSelector, disabledButtonClass, errorClass, textErrorClass} = selectorValidator

enableValidation(formSelector, disabledButtonClass, errorClass, textErrorClass);
