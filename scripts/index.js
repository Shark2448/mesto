const profileOpenButton = document.querySelector('.profile__edit-button');
const cardOpenButton = document.querySelector('.profile__add-button');
const closeButtons = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const popupPhoto = document.querySelector('.popup_photo');
const imageRaise = document.querySelector('.popup__photo-img');
const imageName = document.querySelector('.popup__photo-name');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profileFieldName = document.querySelector('.popup__field_profile_name');
const profileFieldAbout = document.querySelector('.popup__field_profile_about');
const cardFieldName = document.querySelector('.popup__field_card_name');
const cardFieldLink = document.querySelector('.popup__field_card_link');
const profileForm = document.querySelector('.popup__profile-form');
const cardForm = document.querySelector('.popup__card-form');
const cardContainer = document.querySelector('.photo-cards');
const inputList = Array.from(cardForm.querySelectorAll('.popup__field'));

import Card from './Card.js';
import FormValidator from './FormValidator.js';

const selectorValidator = {
  formSelector: '.popup__container',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__save-button',
  disabledButtonClass: 'popup__save-button_disabled',
  textErrorClass: 'popup__error-text',
  errorClass: 'popup__error-text_invalid',
};

const cardValidation = new FormValidator(selectorValidator, cardForm);
const profileValidation = new FormValidator(selectorValidator, profileForm);

cardValidation.enableValidation();
profileValidation.enableValidation();

const initialCards = [
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

profileOpenButton.addEventListener('click', () => {
  profileFieldName.value = profileName.textContent
  profileFieldAbout.value = profileAbout.textContent
  openPopup(popupProfile) 
  profileValidation.resetValidation();
})

cardOpenButton.addEventListener('click', () => {
  openPopup(popupCard)

  inputList.forEach((inputElement) => {
    inputElement.value = ''
  });

  cardValidation.resetValidation();
});

function enhanceTheImage (name, link) {
  imageRaise.src = link
  imageRaise.alt = name
  imageName.textContent = name
  openPopup(popupPhoto)
};

function openPopup(popup) {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', handleCloseOnOverlay);
  document.addEventListener('keydown', handleEscClose);
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
  popup.removeEventListener('click', handleCloseOnOverlay);
  document.removeEventListener('keydown', handleEscClose);
}

function handleCloseOnOverlay(evt) {
  closePopup(evt.target);
};

function handleEscClose (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = profileFieldName.value
  profileAbout.textContent = profileFieldAbout.value
  closePopup(popupProfile)
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard({ name: cardFieldName.value, link: cardFieldLink.value })
  evt.target.reset()
  closePopup(popupCard)
}

const renderCard = (data) => {
  const card = new Card(data, '#card-template', enhanceTheImage);
  cardContainer.prepend(card.createCard());
}

initialCards.map((card) => {
  renderCard(card);
})

cardForm.addEventListener('submit', handleCardFormSubmit)

profileForm.addEventListener('submit', handleProfileFormSubmit);

closeButtons.forEach((button) => {
  const popup = button.closest('.popup');
  button.addEventListener('click', () => closePopup(popup))
})

