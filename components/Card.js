export default class Card {
  constructor({ name, link, selector, handleCardClick }) {
    this._elementTitle = name;
    this._elementSrc = link;
    this._templateSelector = selector;
    this._handleCardClick = handleCardClick;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _handleLikeButton() {
    this._likeButton.classList.toggle("element__like_active");
  }
  _remove() {
    this._element.remove();
    this._element = null;
  }
  _setEventListener() {
    this._cardImage.addEventListener("click", () => {
      console.log(this._handleCardClick);
      this._handleCardClick(this._elementTitle, this._elementSrc);
    });

    this._likeButton.addEventListener("click", (evt) => {
      this._handleLikeButton(evt);
    });
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", () => this._remove());
  }
  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__photo");
    this._setEventListener();
    this._cardImage.src = this._elementSrc;
    this._cardImage.alt = this._elementTitle;
    this._element.querySelector(".element__title").textContent =
      this._elementTitle;
    return this._element;
  }
}
