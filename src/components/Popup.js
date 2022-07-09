export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._closeBtn = this._popup.querySelector(".popup__close-icon");
  }
  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListener();
    this._handleEscClose();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose() {
    document.addEventListener("keydown", (evt) => {
      if (evt.key === "Escape") {
        this.close.bind(this);
        this.close();
      }
    });
  }

  setEventListener() {
    this._closeBtn.addEventListener("click", () => this.close());
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  }
}
