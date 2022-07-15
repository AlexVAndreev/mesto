export default class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  setItem(element) {
    this._container.prepend(element);
  }

  clear() {
    this._container.innerHTML = "";
  }

  renderItems(data, userId) {
    data.forEach((item) => {
      this._element = this._renderer(item, userId);
      this.setItem(this._element);
    });
  }
}
