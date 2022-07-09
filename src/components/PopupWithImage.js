import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(title, src) {
    this._popup.querySelector(".popup__card-image").alt = title;
    this._popup.querySelector(".popup__card-title").textContent = title;
    this._popup.querySelector(".popup__card-image").src = src;
    super.open();
    super.setEventListener();
    super._handleEscClose();
  }
}
