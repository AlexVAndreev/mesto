const popup = document.querySelector(".popup_forms");
const popupImage = document.querySelector(".popup_image");
const editClose = document.querySelectorAll(".popup__close-icon");
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
  const addElement = elementTemplate.querySelector(".element").cloneNode(true);
  const elementImage = addElement.querySelector(".element__photo");
  elementImage.src = elementSrc;
  elementImage.addEventListener("click", openImage);
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
function openImage(event) {
  console.log(event);
  popupImage.classList.add("popup_opened");
  const createImage = document.createElement("img");
  const createImageTitle = document.createElement("h3");
  const popupImageContainer = document.querySelector(".popup__image-container");

  createImageTitle.textContent =
    event.target.parentNode.querySelector(".element__title").textContent;

  createImageTitle.classList.add("popup__image-title");
  createImageTitle.classList.add("popup__image-title_opened");

  createImage.src = event.target.currentSrc;
  createImage.classList.add("popup__image_opened");
  createImage.style.maxHeight = "75vh";
  createImage.style.maxWidth = "75vw";
  popupImageContainer.insertAdjacentElement("beforeend", createImage);
  popupImageContainer.insertAdjacentElement("beforeend", createImageTitle);
}
function closePopupImage() {
  document.querySelector(".popup__image_opened").remove();
  document.querySelector(".popup__image-title_opened").remove();
  popupImage.classList.remove("popup_opened");
}

editClose[0].addEventListener("click", closePopup);
editClose[1].addEventListener("click", closePopupImage);
profileEdit.addEventListener("click", () => openPopup("profile"));
elementAddBtn.addEventListener("click", () => openPopup("element"));
profileEditForm.addEventListener("submit", formSubmitProfile);
elementAddForm.addEventListener("submit", formSubmitElement);
