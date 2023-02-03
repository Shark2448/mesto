export default class Card {
    constructor(data, cardSelector, userInfo, handleCardClick, handleCardLike, handleCardDislike, handleDeleteCard) {
        this._userId = userInfo._id;
        this._cardId = data._id;
        this._cardCreatorId = data.owner._id
        this._likes = data.likes;
        this._name = data.name;
        this._link = data.link;
        this._cardSelector = cardSelector;
        this._handleCardClick = handleCardClick;
        this._handleDeleteCard = handleDeleteCard;
        this._handleCardLike = handleCardLike;
        this._handleCardDislike = handleCardDislike;
        this._element = this._cardTemplate();
        this._cardLikeButton = this._element.querySelector('.card__like-button');
        this._cardDeleteButton = this._element.querySelector('.card__delete-button');
        this._cardLink = this._element.querySelector('.card__img');
        this._cardLike = this._element.querySelector('.card__likes')
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

        if(this._cardCreatorId === this._userId) {
            this._cardDeleteButton.classList.add('card__delete-button_active')
        }

        this._cardLike.textContent = this._likes.length;

        if(this.liked()) {
            this._cardLikeButton.classList.add('card__like-button_active');
        }

        this._setEventListeners();

        return this._element;
    }

    liked() {
        return Boolean(this._likes.find(item => item._id === this._userId))
    }

    _setEventListeners() {
        this._cardLikeButton.addEventListener('click', () => {
            this._likeButton();
        });

        this._cardDeleteButton.addEventListener('click', () => {
            this._handleDeleteCard(this);
        });

        this._cardLink.addEventListener('click', () => {
            this._handleCardClick(this._name, this._link);
        })
    }

    likeOn(data) {
        this._cardLike.textContent = data.likes.length;
        this._cardLikeButton.classList.add('card__like-button_active');
    }

    likeOff(data) {
        this._cardLike.textContent = data.likes.length;
        this._cardLikeButton.classList.remove('card__like-button_active');
    }

    _likeButton() {
        if(this.liked()) {
            this._handleCardDislike(this);
        } else {
            this._handleCardLike(this);
        }
    }

    deleteContent() {
        this._element.remove();
        this._element = null;
    }
}