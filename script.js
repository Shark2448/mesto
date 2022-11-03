const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popupProfile = document.querySelector('.popup_profile');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profileFieldName = document.querySelector('.popup__field_name');
const profileFieldAbout = document.querySelector('.popup__field_about');
const profileForm = document.querySelector('.popup__container_profile');

editButton.addEventListener('click', () => {
    profileFieldName.value = profileName.textContent
    profileFieldAbout.value = profileAbout.textContent
    popupProfile.classList.add('popup_opened')
})

closeButton.addEventListener('click', closePopup)

function closePopup () {
    popupProfile.classList.remove('popup_opened')
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = profileFieldName.value
    profileAbout.textContent = profileFieldAbout.value
    closePopup()
}

profileForm.addEventListener('submit', formSubmitHandler);