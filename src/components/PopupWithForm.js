import Popup from "./Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputlist = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    this._formInputValues = {};
    this._inputlist.forEach((element) => {
      this._formInputValues[element.name] = element.value;
    });
    return this._formInputValues;
  }

  setEventListener() {
    this._form.addEventListener("submit", () => {
      this._handleSubmit(this._getInputValues());
    });
    super.setEventListener();
  }

  close() {
    super.close();
    this._form.reset();
  }
}
