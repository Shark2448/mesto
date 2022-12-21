export default class Card {
    constructor(data, cardSelector, enhanceTheImage) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._element = this._cardTemplate();
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._cardDeleteButton = this._element.querySelector('.card__delete-button');
        this._cardImg = this._element.querySelector('.card__img');
        this._enhanceTheImage = enhanceTheImage;
    }

    _cardTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content
        .querySelector('.card')
        .cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._element.querySelector('.card__title').textContent = this._name;
        const cardLink = this._element.querySelector('.card__img');
        cardLink.src = this._link;
        cardLink.alt = this._name;

        this._handleLikeCard();
        this._deleteCard();
        this._cardImagePopup()

        return this._element;
    }

    _handleLikeCard() {
        this._cardLikeButton.addEventListener('click', () => {
            this._cardLikeButton.classList.toggle('card__like-button_active');
        });
        
    }

    _deleteCard() {
        this._cardDeleteButton.addEventListener('click', () => {
            this._element.remove();
            this._element = null;
        });

    }

    _cardImagePopup() {
        this._cardImg.addEventListener('click', () => {
            this._enhanceTheImage(this._name, this._link);
        });
    }
}