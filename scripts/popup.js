const profileOpenButton = document.querySelector('.profile__edit-button');
const cardOpenButton = document.querySelector('.profile__add-button')
const closeButton = document.querySelectorAll('.popup__close-button');
const popupProfile = document.querySelector('.popup_profile');
const popupCard = document.querySelector('.popup_card');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profileFieldName = document.querySelector('.popup__field_profile_name');
const profileFieldAbout = document.querySelector('.popup__field_profile_about');
const cardFieldName = document.querySelector('.popup__field_card_name');
const cardFieldLink = document.querySelector('.popup__field_card_link');
const profileForm = document.querySelector('.popup__profile-form');
const cardForm = document.querySelector('.popup__card-form');
const cardContainer = document.querySelector('.photo-cards')

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

const cardTemplate = document.querySelector('#card-template').content.querySelector('.card');

const deleteCardHandler = (evt) => {
  evt.target.closest('.card').remove();
}

const createCard = (card) => {
  const newCard = cardTemplate.cloneNode(true);

  const cardTitle = newCard.querySelector('.card__title');
  cardTitle.textContent = card.name;

  const cardLink = newCard.querySelector('.card__img');
  cardLink.src = card.link;
  cardLink.alt = card.name;

  const deleteButton = newCard.querySelector('.card__delete-button')
  deleteButton.addEventListener('click', deleteCardHandler)

  const likeButton = newCard.querySelector('.card__like-button');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active')
  })

  return newCard;
}

profileOpenButton.addEventListener('click', () => {
  profileFieldName.value = profileName.textContent
  profileFieldAbout.value = profileAbout.textContent
  popupProfile.classList.add('popup_opened')
})

cardOpenButton.addEventListener('click', () => {
  popupCard.classList.add('popup_opened')
})

function closePopup() {
  popupProfile.classList.remove('popup_opened')
  popupCard.classList.remove('popup_opened')
}

function profileFormSubmitHandler(evt) {
  evt.preventDefault();
  profileName.textContent = profileFieldName.value
  profileAbout.textContent = profileFieldAbout.value
  closePopup()
}

function cardFormSubmitHandler(evt) {
  evt.preventDefault();
  renderCard({ name: cardFieldName.value, link: cardFieldLink.value })
  cardFieldName.value = '';
  cardFieldLink.value = '';
  closePopup()
}

const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
}

initialCards.map((card) => {
  renderCard(card);
})

cardForm.addEventListener('submit', cardFormSubmitHandler)

profileForm.addEventListener('submit', profileFormSubmitHandler);

closeButton.forEach((button) => button.addEventListener('click', closePopup))
