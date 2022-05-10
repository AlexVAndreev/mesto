import FormValidator from "./FormValidator.js";
import Card from "./Card.js";

const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__span-error",
};

// Попапы
const popupProfileEdit = document.querySelector(".popup_profile-edit");
const popupElementAdd = document.querySelector(".popup_element-add");
const cardImage = document.querySelector(".popup__card-image");
const cardTitle = document.querySelector(".popup__card-title");
const popupCard = document.querySelector(".popup_cards");

// Кнопки
const profileEditOpenButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = document.querySelector(
  ".popup__close-profile-edit"
); // кнопка закрытия редактирования профиля
const elementAddBtn = document.querySelector(".profile__add-button");
const elementAddCloseButton = document.querySelector(
  ".popup__close-element-add"
);
// Зaполняемые поля
const profileEditForm = document.querySelector(".popup__profile-form");
const profileTitle = document.querySelector(".profile__title");
const profileSubtitle = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector(".popup__profile-input_type_title");
const jobInput = document.querySelector(".popup__profile-input_type_subtitle");

const elementInputTitle = document.querySelector(
  ".popup__element-input_type_title"
);
const elementInputLink = document.querySelector(
  ".popup__element-input_type_link"
);

const elementsGrid = document.querySelector(".elements");
const elementAddForm = document.querySelector(".popup__element-form");
const elementSelector = "#element";
const popupCardCloseButton = document.querySelector(
  ".popup__card-close-button"
);

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

function createCard(name, link, selector) {
  const card = new Card(name, link, selector, openPopupCard);
  return card.generateCard();
}

initialCards.forEach((item) => {
  const tmp = createCard(item.name, item.link, elementSelector);
  renderElement(tmp);
});

function renderElement(renderCard) {
  elementsGrid.prepend(renderCard);
}

function openPopup(popup) {
  popup.classList.add("popup_opened");
  popup.addEventListener("mousedown", closeByClick);
  document.addEventListener("keydown", closeByEscape);
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", closeByEscape);
  popup.removeEventListener("click", closeByClick);
}
// Обработка редактирования профиля.
function openProfileEdit() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;

  openPopup(popupProfileEdit);
  profileValidation.toggleState();
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup(popupProfileEdit);
}
// Обработка добавления карточки
function openAddElement() {
  openPopup(popupElementAdd);
}

function formSubmitElement(evt) {
  evt.preventDefault();
  const buttonSubmit = evt.target.querySelector(".popup__submit-btn");
  const tmpCard = createCard(
    elementInputTitle.value,
    elementInputLink.value,
    elementSelector
  );
  renderElement(tmpCard);
  closePopup(popupElementAdd);
  elementAddForm.reset();
  newCardValidation.toggleState();
}

function openPopupCard(elementTitle, elementSrc) {
  cardImage.alt = elementTitle;
  cardTitle.textContent = elementTitle;
  cardImage.src = elementSrc;
  openPopup(popupCard);
}

function closeByEscape(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_opened");
    closePopup(openedPopup);
  }
}
function closeByClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closePopup(evt.target);
  }
}
// const formList = Array.from(document.querySelectorAll(settings.formSelector));
// console.log(formList);
// formList.forEach((formElement) => {
//   formElement.addEventListener("submit", (evt) => {
//     evt.preventDefault();
//   });
//   const Validator = new FormValidator(settings, formElement);
//   Validator.enableValidation();
// });

const profileValidation = new FormValidator(settings, profileEditForm);
const newCardValidation = new FormValidator(settings, elementAddForm);
profileValidation.enableValidation();
newCardValidation.enableValidation();

// кнопки редиктирования профиля
profileEditOpenButton.addEventListener("click", openProfileEdit);
profileEditCloseButton.addEventListener("click", () => {
  closePopup(popupProfileEdit);
});
profileEditForm.addEventListener("submit", formSubmitProfile);

// Кнопки добавления элемента
elementAddBtn.addEventListener("click", openAddElement);
elementAddCloseButton.addEventListener("click", () =>
  closePopup(popupElementAdd)
);
elementAddForm.addEventListener("submit", formSubmitElement);

// Закрытие попапа с картинкой
popupCardCloseButton.addEventListener("click", () => closePopup(popupCard));
// popupCard.addEventListener("click", () => closePopup(popupCard));
