import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._saveButton = this._popup.querySelector(".popup__submit-btn");
  }

  open(id, element) {
    this._idCard = id;
    this._element = element;
    super.open();
  }

  setEventListeners() {
    super.setEventListener();

    this._saveButton.addEventListener("click", () => {
      this._handleSubmit(this._idCard, this._element);
    });
  }

  setStateSaveButton(text) {
    this._saveButton.textContent = text;
  }
}
