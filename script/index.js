import FormValidator from "./FormValidator.js";
import Card from "./Card.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithFrom from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";

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
  // {
  //   name: "girl",
  //   link: "https://w-dog.ru/wallpapers/4/6/538862541836441/devushka-krasivaya-lico-golubye-glaza-volosy-portret-sharf.jpg",
  // },
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

const pCard = new PopupWithImage(popupCard);
const popupWithFormProfile = new PopupWithFrom(
  popupProfileEdit,
  editFormProfile
);
const popupWithElementAdd = new PopupWithFrom(popupElementAdd, addCard);

const editUserInfo = new UserInfo({
  titleSelector: profileTitle,
  subTitleSelector: profileSubtitle,
});

const CardList = new Section(
  {
    data: initialCards,
    renderer: (item) => {
      const card = new Card({
        name: item.name,
        link: item.link,
        selector: "#element",
        handleCardClick: (name, link) => {
          pCard.open(name, link);
          pCard.setEventListener();
        },
      });
      const cardElement = card.generateCard();
      CardList.setItem(cardElement);
    },
  },
  ".elements"
);
CardList.renderItems();

function createCard(item) {
  // создание карточки
  const card = new Card({
    name: item.name,
    link: item.link,
    selector: "#element",
    handleCardClick: (name, link) => {
      pCard.open(name, link);
      pCard.setEventListener();
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
  CardList.setItem(newCard);
  popupWithElementAdd.close();
  elementAddForm.reset();
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
});
