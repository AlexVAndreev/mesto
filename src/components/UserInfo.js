export default class UserInfo {
  constructor({ titleSelector, subTitleSelector, avatarSelector }) {
    this._title = document.querySelector(titleSelector);
    this._subTitle = document.querySelector(subTitleSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      title: this._title.textContent,
      subTitle: this._subTitle.textContent,
    };
  }

  setUserInfo({ data }) {
    this._title.textContent = data.name;
    this._subTitle.textContent = data.about;
  }
  setUserAvatar(link) {
    this._avatar.src = link;
  }
}
