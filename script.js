let popup = document.querySelector(".popup");

function openPopup() {
  popup.classList.add("popup_opened");
  //   console.log(popup);
  let profileTitle = document.querySelector(".profile__title").textContent;
  let profileSubtitle =
    document.querySelector(".profile__subtitle").textContent;

  document.querySelector(".popup__profile-title").value = profileTitle;
  document.querySelector(".popup__profile-subtitle").value = profileSubtitle;
  //   console.log(profileTitle);
  //   console.log(profileSubtitle);
}
function closePopup() {
  popup.classList.remove("popup_opened");
  //   console.log(popup);
}
// openPopup();
let profileEdit = document.querySelector(".profile__edit-button");
let editClose = document.querySelector(".popup__close-icon");
console.log(editClose);
profileEdit.addEventListener("click", openPopup);
editClose.addEventListener("click", closePopup);

let formElement = document.querySelector(".popup__container");
let nameInput = document.querySelector(".popup__profile-title");
let jobInput = document.querySelector(".popup__profile-subtitle");

function formSubmitHandler(evt) {
  evt.preventDefault();
  document.querySelector(".profile__title").textContent = nameInput.value;
  document.querySelector(".profile__subtitle").textContent = jobInput.value;
  closePopup();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", formSubmitHandler);
