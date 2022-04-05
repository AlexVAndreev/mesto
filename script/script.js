// Попапы
const popupProfileEdit = document.querySelector(".popup_profile-edit");
const popupElementAdd = document.querySelector(".popup_element-add");
const popupCard = document.querySelector(".popup_cards");
console.log(popupCard);
// Кнопки
const profileEditOpenButton = document.querySelector(".profile__edit-button");
const profileEditCloseButton = document.querySelector(
  ".popup_close-profile-edit"
); // кнопка закрытия редактирования профиля
const elementAddBtn = document.querySelector(".profile__add-button");
const elementAddCloseButton = document.querySelector(
  ".popup_close-element-add"
);
// Зполняемые поля
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
const elementTemplate = document.querySelector("#element").content;

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
// вставка элемента
function insertElement(elementTitle, elementSrc) {
  const cardElement = elementTemplate.querySelector(".element").cloneNode(true);
  const elementImage = cardElement.querySelector(".element__photo");
  elementImage.src = elementSrc;
  elementImage.alt = elementTitle;
  elementImage.addEventListener("click", openPopupCard); //Добавление слушателя на картинку
  cardElement.querySelector(".element__title").textContent = elementTitle;
  cardElement
    .querySelector(".element__like")
    .addEventListener("click", likeActive);
  cardElement
    .querySelector(".element__basket")
    .addEventListener("click", removeElement);

  return cardElement;
}
function renderElement(renderCard) {
  elementsGrid.prepend(renderCard);
}
// первоначальная загрузка карточек
initialCards.forEach((item) => {
  renderElement(insertElement(item.name, item.link));
});

function openPopup(popup) {
  popup.classList.add("popup_opened");
}
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}
// Обработка редактирования профиля.
function openProfileEdit() {
  openPopup(popupProfileEdit);
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
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
  console.log(elementInputTitle.value);
  renderElement(insertElement(elementInputTitle.value, elementInputLink.value));
  closePopup(popupElementAdd);
  elementInputTitle.value = "";
  elementInputLink.value = "";
}

// Обработка Лайка
function likeActive(event) {
  // console.log(event);
  event.target.classList.toggle("element__like_active");
}

function removeElement(event) {
  event.target.closest(".element").remove();
}
function openPopupCard(event) {
  console.log(event);
  openPopup(popupCard);

  const createImage = document.querySelector(".popup__card-image");
  const createTitle = document.querySelector(".popup__card-title");
  createImage.src = event.target.currentSrc;
  createImage.alt = event.target.alt;
  console.log(event.target.alt);
  createTitle.textContent = event.target.alt;
}

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
