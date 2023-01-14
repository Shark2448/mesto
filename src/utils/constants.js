export const profileOpenButton = document.querySelector('.profile__edit-button');
export const cardOpenButton = document.querySelector('.profile__add-button');

export const profileForm = document.querySelector('.popup__profile-form');
export const profileName = document.querySelector('.profile__name');
export const profileAbout = document.querySelector('.profile__text');
export const profileFieldName = document.querySelector('.popup__field_profile_name');
export const profileFieldAbout = document.querySelector('.popup__field_profile_about');

export const cardForm = document.querySelector('.popup__card-form');

export const cardListSelector = '.photo-cards';
export const popupCardSelector = '.popup_card';
export const popupPhotoSelector = '.popup_photo';
export const popupProfileSelector = '.popup_profile';

export const selectorValidator = {
    formSelector: '.popup__container',
    inputSelector: '.popup__field',
    submitButtonSelector: '.popup__save-button',
    disabledButtonClass: 'popup__save-button_disabled',
    textErrorClass: 'popup__error-text',
    errorClass: 'popup__error-text_invalid',
  };

export const inputList = Array.from(cardForm.querySelectorAll('.popup__field'));


export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];