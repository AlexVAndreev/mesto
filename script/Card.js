const createImage = document.querySelector(".popup__card-image");
const createTitle = document.querySelector(".popup__card-title");
const popupCard = document.querySelector(".popup_cards");

export default class Card {
  constructor(name, link, templateSelector) {
    this._elementTitle = name;
    this._elementSrc = link;
    this._templateSelector = templateSelector;
  }
  _getTemplate() {
    const cardElement = this._templateSelector
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }
  _like() {
    this._element
      .querySelector(".element__like")
      .classList.toggle("element__like_active");
  }
  _remove() {
    this._element.closest(".element").remove();
  }

  _openPopupCard() {
    createImage.alt = this._elementTitle;
    createTitle.textContent = this._elementTitle;
    createImage.src = this._elementSrc;
    popupCard.classList.add("popup_opened");
  }

  _setEventListener() {
    this._element
      .querySelector(".element__photo")
      .addEventListener("click", () => this._openPopupCard());
    this._element
      .querySelector(".element__like")
      .addEventListener("click", () => this._like());
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", () => this._remove());
  }
  generateCard() {
    this._element = this._getTemplate();
    this._setEventListener();
    this._element.querySelector(".element__photo").src = this._elementSrc;
    this._element.querySelector(".element__photo").alt = this._elementTitle;
    this._element.querySelector(".element__title").textContent =
      this._elementTitle;
    return this._element;
  }
}
