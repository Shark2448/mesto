import './index.css';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirm from '../components/PopupWithConfirm';
import UserInfo from '../components/UserInfo.js';
import Api from '../components/Api.js';

import {
  profileOpenButton,
  cardOpenButton,
  avatarOpenButton,
  profileForm,
  cardFormSelector,
  profileFormSelector,
  avatarFormSelector,
  profileFieldName,
  profileFieldAbout,
  saveButton,
  cardForm,
  selectorValidator,
  popupCardSelector,
  popupPhotoSelector,
  popupProfileSelector,
  popupAvatarSelector,
  popupConfirmSelector,
  cardListSelector,
  profileNameSelector,
  profileAboutSelector,
  avatarForm,
  profileAvatar,
  avatarLink,

} from '../utils/constants.js';
import { data } from 'autoprefixer';

const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-58',
  headers: {
    authorization: '0737b776-3e93-4445-a720-544dbb190638',
    'Content-Type': 'application/json'
  }
})

let cardList
let userInfo 

//классы
const popupProfileWithForm = new PopupWithForm(popupProfileSelector, handleProfileFormSubmit, profileFormSelector);
const popupCardWithForm = new PopupWithForm(popupCardSelector, handleCardFormSubmit, cardFormSelector);
const popupAvatarWithForm = new PopupWithForm(popupAvatarSelector, handleAvatarFormSubmit, avatarFormSelector);
const popupConfirmWithForm = new PopupWithConfirm(popupConfirmSelector);
const popupCardImage = new PopupWithImage(popupPhotoSelector);


const userProfileInfo = new UserInfo({nameSelector: profileNameSelector, aboutSelector: profileAboutSelector, userAvatar: profileAvatar})

//слушатели
popupProfileWithForm.setEventListeners();
popupAvatarWithForm.setEventListeners();
popupConfirmWithForm.setEventListeners();
popupCardWithForm.setEventListeners();
popupCardImage.setEventListeners();

//валидация
const cardValidation = new FormValidator(selectorValidator, cardForm);
const profileValidation = new FormValidator(selectorValidator, profileForm);
const avatarValidation = new FormValidator(selectorValidator, avatarForm);

cardValidation.enableValidation();
profileValidation.enableValidation();
avatarValidation.enableValidation();

//открыть Profile
profileOpenButton.addEventListener('click', () => {
  const userInfo = userProfileInfo.getUserInfo();
  profileFieldName.value = userInfo.name;
  profileFieldAbout.value = userInfo.about;

  popupProfileWithForm.openPopup();
  profileValidation.resetValidation();
})

//открыть Avatar
avatarOpenButton.addEventListener('click', () => {
  avatarLink.value = '';
  popupAvatarWithForm.openPopup();
  avatarValidation.resetValidation();
})

//открыть Card
cardOpenButton.addEventListener('click', () => {
  popupCardWithForm.openPopup();
  cardValidation.resetValidation();
});

//форма Profile
function handleProfileFormSubmit(data) {
  renderLoading(true, saveButton, popupProfileWithForm)
  api.changeUserInfo(data)
  .then((data) => {
    userProfileInfo.changeUserInfo(data);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, saveButton, popupProfileWithForm)
  })
}

//форма Avatar
function handleAvatarFormSubmit(data) {
  renderLoading(true, saveButton, popupAvatarWithForm)
  api.changeUserAvatar(data)
  .then((data) => {
    userProfileInfo.changeUserAvatar(data);
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, saveButton, popupAvatarWithForm)
  })
}

//форма Card
function handleCardFormSubmit(data) {
  renderLoading(true, saveButton, popupCardWithForm)
  api.createNewCard(data)
  .then((card) => {
    console.log(userInfo)
    cardList.addNewItem(createCard(card, userInfo));
    popupCardWithForm.close()
  })
  .catch((err) => {
    console.log(err)
  })
  .finally(() => {
    renderLoading(false, saveButton, popupCardWithForm)
  })
}

//создание карточки
function createCard (data, userInfo) {
  const card = new Card(data, '#card-template', userInfo, (name, link) => {popupCardImage.openPopup(name, link)}, handleCardLike, handleCardDislike, handleDeleteCard);
  const cardElement = card.createCard()
  return cardElement
}

//рендер
Promise.all([api.getUserInfo(), api.getInitialCards()])
.then(([userData, cards]) => {
  userInfo = userData;
  userProfileInfo.setUserInfo(userData);
  cardList = new Section ({
    data: cards,
    renderer: (item) => {
      cardList.addItem(createCard(item, userData))
    }
  }, cardListSelector);
  cardList.renderItems(cards);
})
.catch((err) => {
  console.log(err)
})

// UX
function renderLoading(loading, saveButton, popup) {
  if(loading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = 'Сохранить'
    popup.closePopup();
  }
}

//Like
function handleCardLike(item) {
  api.likeCard(item._cardId)
  .then((data) => {
    item.likeOn(data);
  })
  .catch((err) => {
    console.log(err)
  })
}

//Dislike
function handleCardDislike(item) {
  api.dislikeCard(item._cardId)
  .then((data) => {
    item.likeOff(data);
  })
  .catch((err) => {
    console.log(err)
  })
}

//удаление карточки
const handleDeleteCard = (item) => {
  popupConfirmWithForm.setHandleFormSubmit(() => {
    api.deleteCard(item._cardId)
    .then(() => {
      item.deleteContent();
    })
    .then(() => {
      popupConfirmWithForm.closePopup();
    })
    .catch((err) => {
      console.log(err)
    })
  })
  popupConfirmWithForm.openPopup();
}