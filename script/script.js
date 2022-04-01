const popup = document.querySelector(".popup__forms");
const editClose = document.querySelector(".popup__close-icon");
const profileEdit = document.querySelector(".profile__edit-button");
const elementAddBtn = document.querySelector(".profile__add-button");

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
// вставка элемента
function insertElement(elementTitle, elementSrc) {
  const addElement = elementTemplate.querySelector(".element").cloneNode(true);
  addElement.querySelector(".element__photo").src = elementSrc;
  addElement.querySelector(".element__title").textContent = elementTitle;
  addElement
    .querySelector(".element__like")
    .addEventListener("click", likeActive);
  addElement
    .querySelector(".element__basket")
    .addEventListener("click", removeElement);
  elementsGrid.prepend(addElement);
}
// первоначальная загрузка карточек
initialCards.forEach(function (item) {
  insertElement(item.name, item.link);
});

function openPopup(oPopup) {
  popup.classList.add("popup_opened");
  if (oPopup === "profile") {
    profileEditForm.classList.add("popup_opened");
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileSubtitle.textContent;
  } else if (oPopup === "element") {
    elementAddForm.classList.add("popup_opened");
  }
}

function closePopup() {
  popup.classList.remove("popup_opened");
  elementAddForm.classList.remove("popup_opened");
  profileEditForm.classList.remove("popup_opened");
}

function formSubmitProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}

function formSubmitElement(evt) {
  evt.preventDefault();
  insertElement(elementInputTitle.value, elementInputLink.value);
  closePopup();
  elementInputTitle.value = "";
  elementInputLink.value = "";
}

function likeActive(event) {
  // console.log(event);
  event.target.classList.toggle("element__like_active");
}

function removeElement(event) {
  // console.log(event.target.parentNode);
  event.target.parentNode.remove();
}

editClose.addEventListener("click", closePopup);
profileEdit.addEventListener("click", () => openPopup("profile"));
elementAddBtn.addEventListener("click", () => openPopup("element"));
profileEditForm.addEventListener("submit", formSubmitProfile);
elementAddForm.addEventListener("submit", formSubmitElement);
