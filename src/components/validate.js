// Показываем ошибку при невалидном инпуте
function showError(inputElement, errorElement, config) {
  inputElement.classList.add(config.inputErrorClass);  //добавляем класс невалидности
  errorElement.textContent = inputElement.validationMessage; //добавляем дефолтное сообщение ошибки
}

// Убираем ошибку при валидном инпуте
function hideError(inputElement, errorElement, config) {
  inputElement.classList.remove(config.inputErrorClass); //удаляем класс невалидности
  errorElement.textContent = inputElement.validationMessage; //добавляем пустое дефолтное сообщение ошибки
}

// Проверка валидности инпута
function checkInputValidity(inputElement, formElement, config) {
  const isIputValidity = inputElement.validity.valid;
  const errorElement = formElement.querySelector(`#${inputElement.name}-error`);
  if (isIputValidity) {
    hideError(inputElement, errorElement, config);
  } else { // Если инпут не валиден выводим сообщение об ошибке в элемент ошибки
    showError(inputElement, errorElement, config);
  }
}

// Функция блокировки кнопки в зависимости от валидности инпутов
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
  const inputList = formElement.querySelectorAll(config.inputSelector); // Внутри каждой формы ищем инпуты
  const submitButtonElement = formElement.querySelector(
    config.submitButtonSelector
  );

  toggleButtonState(submitButtonElement, formElement.checkValidity(), config);

  // Перебираем список инпутов конткретной формы и вешаем на каждый инпут обработчик события input
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      toggleButtonState( // Функция блокировки кнопки в зависимости от валидности инпутов
        submitButtonElement,
        formElement.checkValidity(),
        config
      );
      checkInputValidity(inputElement, formElement, config); // При наступлении события ввода в инпут проверяем его валидность
    });
  });

  // Вешаем обработчик события submit на каждую форму в переборе
  formElement.addEventListener("submit", (e) => {
    e.preventDefault();
  });
}

// Находим все формы и перебираем их
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
