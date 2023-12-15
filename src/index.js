import './pages/index.css';
import { renderCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { buttonCardAdd, buttonProfileEdit, cardList, formFormAdd, formFormProfile, initialCards, inputBio, inputLink, inputMesto, inputName, popupTypeAdd, popupTypeEdit, profileBio, profileName } from './components/constants.js';
import { configForm, enableValidation } from './components/validate.js';

//Рендеринг карточек из массива
initialCards.forEach(({ name, link }) => {
  renderCard(name, link, cardList);
});

// Обработчик клика по кнопке открытия popup для редактирования профиля
buttonProfileEdit.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  openPopup(popupTypeEdit);
});
// Обработчик клика по кнопке открытия popup для добавления карточки
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));

// Обработчик отправки формы редактирования профиля
export function handleFormProfileSubmit(e) {
  e.preventDefault();

  const inputNameValue = inputName.value;
  const inputBioValue = inputBio.value;

  profileName.textContent = inputNameValue;
  profileBio.textContent = inputBioValue;
  closePopup(popupTypeEdit);
};

// Обработчик отправки формы добавления карточки
export function handleFormAddSubmit(e) {
  e.preventDefault();

  const inputMestoValue = inputMesto.value;
  const inputLinkValue = inputLink.value;
  renderCard(inputMestoValue, inputLinkValue, cardList);
  closePopup(popupTypeAdd);
  e.target.reset();
};

//Валидация форм
enableValidation(configForm);

// Обработчик отправки формы редактирования профиля
formFormProfile.addEventListener('submit', handleFormProfileSubmit);

// Обработчик отправки формы добавления карточки
formFormAdd.addEventListener('submit', handleFormAddSubmit);
