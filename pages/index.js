import FormValidator from "./components/FormValidator.js";
import Card from "./components/Card.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithFrom from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import "./index.css";

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
// Зaполняемые поля
const profileEditForm = document.querySelector(".popup__profile-form");
const profileTitle = ".profile__title";
const profileSubtitle = ".profile__subtitle";
const nameInput = document.querySelector(".popup__profile-input_type_title");
const jobInput = document.querySelector(".popup__profile-input_type_subtitle");

const elementAddForm = document.querySelector(".popup__element-form");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const popupWithCard = new PopupWithImage(popupCard);
popupWithCard.setEventListener();
const popupWithFormProfile = new PopupWithFrom(
  popupProfileEdit,
  editFormProfile
);
popupWithFormProfile.setEventListener();
const popupWithElementAdd = new PopupWithFrom(popupElementAdd, addCard);
popupWithElementAdd.setEventListener();

const editUserInfo = new UserInfo({
  titleSelector: profileTitle,
  subTitleSelector: profileSubtitle,
});

const cardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      cardList.setItem(createCard(item));
    },
  },
  ".elements"
);
cardList.renderItems();

function createCard(item) {
  // создание карточки
  const card = new Card({
    name: item.name,
    link: item.link,
    selector: "#element",
    handleCardClick: (name, link) => {
      popupWithCard.open(name, link);
    },
  });
  return card.generateCard(item);
}

function addCard(item) {
  // Добавление карточки
  console.log(item);
  const newCard = createCard({
    name: item.name,
    link: item.link,
  });
  cardList.setItem(newCard);
  popupWithElementAdd.close();
}

function openPopupEdit() {
  const item = editUserInfo.getUserInfo();
  nameInput.value = item.title;
  jobInput.value = item.subTitle;
  profileValidation.toggleState();
  popupWithFormProfile.open();
}

function editFormProfile(item) {
  const { profile_title: title, profile_subtitle: subTitle } = item;
  editUserInfo.setUserInfo(title, subTitle);
  popupWithFormProfile.close();
}

const profileValidation = new FormValidator(settings, profileEditForm);
const newCardValidation = new FormValidator(settings, elementAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

// кнопки редиктирования профиля
profileEditOpenButton.addEventListener("click", openPopupEdit);

// Кнопки добавления элемента
elementAddBtn.addEventListener("click", () => {
  popupWithElementAdd.open();
  newCardValidation.toggleState();
});
