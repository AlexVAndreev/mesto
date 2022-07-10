import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardTitle = this._popup.querySelector(".popup__card-image");
    this._cardSubtitle = this._popup.querySelector(".popup__card-title");
  }
  open(title, src) {
    this._cardTitle.alt = title;
    this._cardSubtitle.textContent = title;
    this._cardTitle.src = src;
    super.open();
  }
}
