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

const handleDeleteCard = (evt) => {
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
  deleteButton.addEventListener('click', handleDeleteCard)

  const likeButton = newCard.querySelector('.card__like-button');

  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('card__like-button_active')
  })

  cardLink.addEventListener('click', () => {
    imageRaise.src = card.link
    imageRaise.alt = card.name
    imageName.textContent = card.name
    openPopup(popupPhoto)
  })

  return newCard;
}

profileOpenButton.addEventListener('click', () => {
  profileFieldName.value = profileName.textContent
  profileFieldAbout.value = profileAbout.textContent
  openPopup(popupProfile)
})

cardOpenButton.addEventListener('click', () => {
  openPopup(popupCard)
})

function openPopup(popup) {
  popup.classList.add('popup_opened')
  popup.addEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) 
    closePopup(popup)
  })
  document.addEventListener('keydown', function handleEscClose (evt) {
  
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  });
}

function closePopup(popup) {
  popup.classList.remove('popup_opened')
  
  popup.removeEventListener('click', (evt) => {
    if(evt.target.classList.contains('popup_opened')) 
    closePopup(popup)
  })
  document.removeEventListener('keydown', function handleEscClose (evt) {
  
    if (evt.key === 'Escape') {
      closePopup(popup)
    }
  });
}

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

const renderCard = (card) => {
  cardContainer.prepend(createCard(card));
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
