function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
}

function checkInputValidity(inputElement, formElement, config) {
  const isIputValidity = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isIputValidity) {
    hideError(inputElement, errorElement, config);
  } else {
    showError(inputElement, errorElement, config);
  }
}

function toggleButtonState(buttonElement, isActive, config) {
  if (isActive) {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.inactiveButtonClass);
  } else {
    buttonElement.classList.add(config.inactiveButtonClass);
    buttonElement.disabled = "disabled";
  }
}

function setEventListener(formElement, config) {
  const inputList = formElement.querySelectorAll(config.inputSelector);
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState(
        submitButtonElement,
        formElement.checkValidity(),
        config
      );
      checkInputValidity(inputElement, formElement, config);
    });
  });

  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

export function enableValidation(config) {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach(function (formElement) {
    setEventListener(formElement, config);
  });
}

export const configForm = {
  formSelector: ".form",
  inputSelector: ".form__item",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_invalid",
  inputErrorClass: "form__item_status_invalid",
};

//Валидация форм
enableValidation(configForm);
