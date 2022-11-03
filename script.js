const editButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close-button');
const popup = document.querySelector('.popup');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__text');
const profileFieldName = document.querySelector('.popup__field_name');
const profileFieldAbout = document.querySelector('.popup__field_about');

editButton.addEventListener('click', () => {
    profileFieldName.value = profileName.textContent
    profileFieldAbout.value = profileAbout.textContent
    popup.classList.add('popup_opened')
})

closeButton.addEventListener('click', closePopup)

function closePopup () {
    popup.classList.remove('popup_opened')
}