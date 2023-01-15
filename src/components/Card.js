export default class Card {
    constructor(data, cardSelector, handleCardClick) {
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick
        this._element = this._cardTemplate();
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._cardDeleteButton = this._element.querySelector('.card__delete-button');
        this._cardLink = this._element.querySelector('.card__img');
    }

    _cardTemplate() {
        const cardElement = document.querySelector(this._cardSelector).content
        .querySelector('.card')
        .cloneNode(true);
        return cardElement;
    }

    createCard() {
        this._element.querySelector('.card__title').textContent = this._name;
        this._cardLink.src = this._link;
        this._cardLink.alt = this._name;

        this._setEventListeners();

        return this._element;
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._cardLikeButton.classList.toggle('card__like-button_active');
        });

        this._cardDeleteButton.addEventListener('click', () => {
            this._element.remove();
            this._element = null;
        });

        this._cardLink.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }
}