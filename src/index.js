import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithFrom from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import "./index.css";
import Api from "./components/Api.js";
import PopupConfirm from "./components/PopupConfirm.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__span-error",
};

// Попапы
const popupProfileEdit = ".popup_profile-edit";
const popupElementAdd = ".popup_element-add";
const popupCard = ".popup_cards";

// Кнопки
const profileEditOpenButton = document.querySelector(".profile__edit-button");
const elementAddBtn = document.querySelector(".profile__add-button");
const avatarChangeBtn = document.querySelector(".porfile__avatar-conatainer");
// Зaполняемые поля
const profileEditForm = document.querySelector(".popup__profile-form");
const profileTitle = ".profile__title";
const profileSubtitle = ".profile__subtitle";
const profileAvatar = ".profile__avatar";
const nameInput = document.querySelector(".popup__profile-input_type_title");
const jobInput = document.querySelector(".popup__profile-input_type_subtitle");

const elementAddForm = document.querySelector(".popup__element-form");

// создаем попапы
const popupWithCard = new PopupWithImage(popupCard);
popupWithCard.setEventListener();

const popupWithFormProfile = new PopupWithFrom(
  popupProfileEdit,
  submitFormEdit
);
popupWithFormProfile.setEventListener();

const popupWithElementAdd = new PopupWithFrom(popupElementAdd, addCard);
popupWithElementAdd.setEventListener();

const popupConfirm = new PopupConfirm(".popup__confirm", submitConfirm);
popupConfirm.setEventListeners();

const popupChangeAvatar = new PopupWithFrom(
  ".popup__changeAvatar",
  submitChangeAvatar
);
popupChangeAvatar.setEventListener();

const api = new Api({
  Url: "https://mesto.nomoreparties.co/v1/cohort-44/",
  headers: {
    authorization: "ffd6e9d6-b49f-4571-8718-08d53cb3c5d8",
    "Content-Type": "application/json",
  },
});

// const initialCards = api.getInitialCards();
const editUserInfo = new UserInfo({
  titleSelector: profileTitle,
  subTitleSelector: profileSubtitle,
  avatarSelector: profileAvatar,
});

const cardList = new Section(
  {
    renderer: createCard,
  },
  ".elements"
);
let userId;
// загрузка страницы

function onLoadWindow() {
  Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([info, initialCards]) => {
      editUserInfo.setUserInfo({ data: info });
      editUserInfo.setUserAvatar(info.avatar);
      userId = info._id;
      cardList.renderItems(initialCards, userId);
    })
    .catch((error) => {
      console.log(error);
    });
}

function createCard(item, userId) {
  const card = new Card({
    item,
    userId,
    selector: "#element",
    handleCardClick: (name, link) => {
      popupWithCard.open(name, link);
    },
    openPopupConfirmDelete: (id, element) => {
      popupConfirm.open(id, element);
    },
    changeTotalLike,
  });
  return card.generateCard();
}

function addCard(evt, data, element) {
  element.setStateSaveButton("Сохранение...");
  evt.preventDefault();
  api
    .addCard(data)
    .then((cardData) => {
      const cardHTML = createCard(cardData, userId);
      cardList.setItem(cardHTML);
      popupWithElementAdd.close();
    })
    .finally(() => {
      element.setStateSaveButton("Создать");
    })
    .catch((error) => {
      console.log(error);
    });
}

function openPopupEdit() {
  const item = editUserInfo.getUserInfo();
  nameInput.value = item.title;
  jobInput.value = item.subTitle;
  profileValidation.toggleState();
  popupWithFormProfile.open();
}
function submitFormEdit(evt, data, element) {
  evt.preventDefault();
  element.setStateSaveButton("Сохранение...");
  api
    .changeUserInfo(data)
    .then(() => {
      popupWithFormProfile.close();
      editUserInfo.setUserInfo({ data: data });
    })
    .finally(() => {
      element.setStateSaveButton("Сохранить");
    })
    .catch((error) => {
      console.log(error);
    });
}

function submitConfirm(id, element) {
  popupConfirm.setStateSaveButton("Удаление...");
  api
    .deleteCard(id)
    .then((res) => {
      element.cardDelete();
      popupConfirm.close();
    })
    .finally(() => {
      popupConfirm.setStateSaveButton("Да");
    })
    .catch((error) => {
      console.log(error);
    });
}
function changeTotalLike(stateLike, idCard, card) {
  if (stateLike) {
    api
      .addLike(idCard)
      .then((res) => {
        card.setTotalLike(res.likes.length);
      })
      .catch((error) => {
        console.log(error);
      });
  } else {
    api
      .deleteLike(idCard)
      .then((res) => {
        card.setTotalLike(res.likes.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
function submitChangeAvatar(evt, data, element) {
  element.setStateSaveButton("Сохранение...");
  console.log(data);
  evt.preventDefault();
  api
    .changeAvatar(data.avatar)
    .then(() => {
      editUserInfo.setUserAvatar(data.avatar);
    })
    .finally(() => {
      element.setStateSaveButton("Сохранить");
      popupChangeAvatar.close();
    })
    .catch((error) => {
      console.log(error);
    });
}
const profileValidation = new FormValidator(settings, profileEditForm);
const newCardValidation = new FormValidator(settings, elementAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

document.addEventListener("DOMContentLoaded", onLoadWindow);

// кнопки редиктирования профиля
profileEditOpenButton.addEventListener("click", openPopupEdit);

// Кнопки добавления элемента
elementAddBtn.addEventListener("click", () => {
  popupWithElementAdd.open();
  newCardValidation.toggleState();
});

function openChangeAvatar() {
  popupChangeAvatar.open();
}

avatarChangeBtn.addEventListener("click", openChangeAvatar);
