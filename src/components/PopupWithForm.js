import Popup from "./Popup.js";

export default class PopupWithFrom extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputlist = this._popup.querySelectorAll(".popup__input");
    this._saveButton = this._popup.querySelector(".popup__submit-btn");
  }

  _getInputValues() {
    this._formInputValues = {};
    this._inputlist.forEach((element) => {
      this._formInputValues[element.name] = element.value;
    });
    return this._formInputValues;
  }

  setEventListener() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this.confirmData(evt);
    });
    super.setEventListener();
  }
  confirmData(evt) {
    this._getInputValues();
    this._handleSubmit(evt, this._formInputValues, this);
  }
  setStateSaveButton(text) {
    this._saveButton.value = text;
  }

  close() {
    super.close();
    this._form.reset();
  }
}
