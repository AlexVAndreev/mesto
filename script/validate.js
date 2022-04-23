const settings = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_inactive",
  inputErrorClass: "popup__input-error",
  errorClass: "popup__span-error",
};
console.log(settings.formSelector);
const showInputError = (formElement, inputElement, errorMessage, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  console.log(inputElement);
  inputElement.classList.add(set.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(set.errorClass);
};

const hideInputError = (formElement, inputElement, set) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(set.inputErrorClass);
  errorElement.classList.remove(set.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, set) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      set
    );
  } else {
    hideInputError(formElement, inputElement, set);
  }
};

const setEventListeners = (formElement, set) => {
  console.log(formElement);
  const inputList = Array.from(formElement.querySelectorAll(set.inputSelector));
  const buttonElement = formElement.querySelector(
    settings.submitButtonSelector
  );
  toggleState(inputList, buttonElement, set);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      toggleState(inputList, buttonElement, set);
      checkInputValidity(formElement, inputElement, set);
    });
  });
};
function enableValidation(set) {
  const formList = Array.from(document.querySelectorAll(set.formSelector));
  console.log(formList);
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });

    setEventListeners(formElement, set);
  });
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

function toggleState(inputList, buttonElement, set) {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.add(set.inactiveButtonClass);
    buttonElement.setAttribute("disabled", "true");
  } else {
    buttonElement.classList.remove(set.inactiveButtonClass);
    buttonElement.removeAttribute("disabled");
  }
}
enableValidation(settings);
