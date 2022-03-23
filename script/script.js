let popup = document.querySelector(".popup");
let profileEdit = document.querySelector(".profile__edit-button");
let profileTitle = document.querySelector(".profile__title");
let profileSubtitle = document.querySelector(".profile__subtitle");
let editClose = document.querySelector(".popup__close-icon");
let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__profile-title");
let jobInput = document.querySelector(".popup__profile-subtitle");

function openPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileSubtitle.textContent;
}
function closePopup() {
  popup.classList.remove("popup_opened");
}
console.log(editClose);

function formSubmitHandler(evt) {
  evt.preventDefault();
  profileTitle.textContent = nameInput.value;
  console.log(profileTitle);
  profileSubtitle.textContent = jobInput.value;
  closePopup();
}
editClose.addEventListener("click", closePopup);
profileEdit.addEventListener("click", openPopup);
formElement.addEventListener("submit", formSubmitHandler);
