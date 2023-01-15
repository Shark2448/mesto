import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  profileOpenButton,
  cardOpenButton,
  profileForm,
  cardFormSelector,
  profileFormSelector,
  profileFieldName,
  profileFieldAbout,
  cardForm,
  selectorValidator,
  initialCards,
  popupCardSelector,
  popupPhotoSelector,
  popupProfileSelector,
  cardListSelector,
  profileNameSelector,
  profileAboutSelector
} from '../utils/constants.js';

//классы
const popupProfileWithForm = new PopupWithForm(popupProfileSelector, handleProfileFormSubmit, profileFormSelector);
const popupCardWithForm = new PopupWithForm(popupCardSelector, handleCardFormSubmit, cardFormSelector);
const popupCardImage = new PopupWithImage(popupPhotoSelector);

const userProfileInfo = new UserInfo({nameSelector: profileNameSelector, aboutSelector: profileAboutSelector})

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
  popupCardWithForm.close()
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