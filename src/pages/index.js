import './index.css';
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from '../scripts/section.js';
import PopupWithImage from '../scripts/PopupWithImage.js';
import PopupWithForm from '../scripts/PopupWithForm.js';
import UserInfo from '../scripts/UserInfo.js';

import {
  profileOpenButton,
  cardOpenButton,
  inputList,
  profileForm,
  profileName,
  profileAbout,
  profileFieldName,
  profileFieldAbout,
  cardForm,
  selectorValidator,
  initialCards,
  popupCardSelector,
  popupPhotoSelector,
  popupProfileSelector,
  cardListSelector
} from '../utils/constants.js';

//классы
const popupProfileWithForm = new PopupWithForm(popupProfileSelector, handleProfileFormSubmit);
const popupCardWithForm = new PopupWithForm(popupCardSelector, handleCardFormSubmit);
const popupCardImage = new PopupWithImage(popupPhotoSelector);

const userProfileInfo = new UserInfo({nameElement: profileName, aboutElement: profileAbout})

//слушатели
popupProfileWithForm.setEventListeners();
popupCardWithForm.setEventListeners();
popupCardImage.setEventListeners();

//валидация
const cardValidation = new FormValidator(selectorValidator, cardForm);
const profileValidation = new FormValidator(selectorValidator, profileForm);

cardValidation.enableValidation();
profileValidation.enableValidation();

//открыть Profile
profileOpenButton.addEventListener('click', () => {
  const userInfo = userProfileInfo.getUserInfo();
  profileFieldName.value = userInfo.name;
  profileFieldAbout.value = userInfo.about;

  popupProfileWithForm.openPopup();
  profileValidation.resetValidation();
})

//открыть Card
cardOpenButton.addEventListener('click', () => {
  inputList.forEach((inputElement) => {
    inputElement.value = ''
  });

  popupCardWithForm.openPopup();
  cardValidation.resetValidation();
});

function handleProfileFormSubmit(data) {
  userProfileInfo.changeUserInfo(data)
  popupProfileWithForm.closePopup()
}

function handleCardFormSubmit(item) {
  const cardInfo = {
    name:item.cardName,
    link:item.cardLink
  }
  cardList.addNewItem(createCard(cardInfo))
  popupCardWithForm.closePopup()
}

//создание карточки
function createCard (data) {
  const card = new Card(data, '#card-template', (name, link) => {popupCardImage.openPopup(name, link)});
  const cardElement = card.createCard()
  return cardElement
}

const cardList = new Section ({
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(createCard(item))
  }
}, cardListSelector)

cardList.renderItems();