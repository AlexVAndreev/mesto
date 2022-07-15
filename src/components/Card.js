export default class Card {
  constructor({
    item,
    userId,
    selector,
    handleCardClick,
    openPopupConfirmDelete,
    changeTotalLike,
  }) {
    this._elementTitle = item.name;
    this._elementSrc = item.link;
    this._userId = userId;
    this._likes = item.likes;
    this._owner = item.owner._id;
    this._templateSelector = selector;
    this._handleCardClick = handleCardClick;
    this._openPopupDeleteConfirm = openPopupConfirmDelete;
    this._handleCardLike = changeTotalLike;
    this._id = item._id;
  }
  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".element__like");
    this._cardImage = this._element.querySelector(".element__photo");
    this._likeTotal = this._element.querySelector(".element__like_total");
    this._elementButtonDel = this._element.querySelector(".element__basket");
    this._setEventListener();
    this._cardImage.src = this._elementSrc;
    this._cardImage.alt = this._elementTitle;
    this._cardImage.id = this._id;
    this._likeTotal.textContent = this._likes.length;

    this._element.querySelector(".element__title").textContent =
      this._elementTitle;

    if (this._userId === this._owner) {
      this._elementButtonDel.classList.remove("element__basket_disabled");
    }

    return this._element;
  }

  setTotalLike(totalLikes) {
    this._likeButton.classList.toggle("element__like_active");
    console.log(totalLikes);
    this._likeTotal.textContent = String(totalLikes);
  }

  _handleLikeButton() {
    if (this._likeButton.classList.contains("element__like_active")) {
      this._likeState = false;
    } else {
      this._likeState = true;
    }
    this._handleCardLike(this._likeState, this._id, this);
  }
  cardDelete() {
    this._element.remove();
    this._element = null;
  }

  _setEventListener() {
    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._elementTitle, this._elementSrc);
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeButton();
    });
    this._element
      .querySelector(".element__basket")
      .addEventListener("click", () =>
        this._openPopupDeleteConfirm(this._id, this)
      );
  }
}
