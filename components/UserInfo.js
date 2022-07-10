export default class UserInfo {
  constructor({ titleSelector, subTitleSelector }) {
    this._title = document.querySelector(titleSelector);
    this._subTitle = document.querySelector(subTitleSelector);
  }

  getUserInfo() {
    return {
      title: this._title.textContent,
      subTitle: this._subTitle.textContent,
    };
  }

  setUserInfo(title, subTitle) {
    this._title.textContent = title;
    this._subTitle.textContent = subTitle;
  }
}
