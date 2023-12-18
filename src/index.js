import './pages/index.css';
import { renderCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { buttonAvatarEdit, buttonCardAdd, buttonProfileEdit, cardList, formFormAdd, formFormAvatar, formFormProfile, inputAvatarLink, inputBio, inputLink, inputMesto, inputName, popupTypeAdd, popupTypeAvatar, popupTypeEdit, popups, profileAvatar, profileBio, profileName } from './components/constants.js';
import { configForm, enableValidation } from './components/validate.js';
import { addCard, editAvatarProfile, editProfile, getAllCards, getInfoProfile } from './components/api.js';
import { handleSubmit } from './components/utils.js';

export let myId;

// Рендеринг информации профиля c сервера
const profilePromise = getInfoProfile();

// Рендеринг карточек c сервера
const cardsPromise = getAllCards();

Promise.all([profilePromise, cardsPromise])
  .then(([resultProfile, resultCards]) => {
    profileName.textContent = resultProfile.name;
    profileBio.textContent = resultProfile.about;
    profileAvatar.src = resultProfile.avatar;
    myId = resultProfile._id;

    resultCards.forEach((card) => {
      renderCard(card, cardList);
    });
  })
  .catch(console.error);


// Обработчик клика по кнопке открытия popup для редактирования профиля
buttonProfileEdit.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  openPopup(popupTypeEdit);
});

// Обработчик клика по кнопке редактирования аватара профиля
buttonAvatarEdit.addEventListener('click', () => openPopup(popupTypeAvatar));

// Обработчик клика по кнопке открытия popup для добавления карточки
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));

// Закрытие popup по оверлею и крестику
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (e.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  });
});

// Функция редактирования профиля
export function handleFormProfileSubmit(e) {
  // создаем функцию, которая возвращает промис, так как любой запрос возвращает его
  function makeRequest() {
    // return позволяет потом дальше продолжать цепочку `then, catch, finally`
    return editProfile({
      name: inputName.value,
      about: inputBio.value
    })
      .then((userData) => {
        profileName.textContent = userData.name;
        profileBio.textContent = userData.about;
        closePopup(popupTypeEdit);
      });
  }
  // вызываем универсальную функцию, передавая в нее запрос, событие и текст изменения кнопки (если нужен другой, а не `"Сохранение..."`)
  handleSubmit(makeRequest, e);
}


// Функция редактирования аватара профиля
export function handleFormAvatarSubmit(e) {
  function makeRequest() {
    return editAvatarProfile(inputAvatarLink.value)
      .then(() => {
        profileAvatar.src = inputAvatarLink.value;
        closePopup(popupTypeAvatar);
      });
  }
  handleSubmit(makeRequest, e);
}

// Функция добавления карточки
export function handleFormAddSubmit(e) {
  function makeRequest() {
    return addCard({
      name: inputMesto.value,
      link: inputLink.value
    })
      .then((newDataCard) => {
        renderCard(newDataCard, cardList, 'prepend')
        closePopup(popupTypeAdd);
      });
  }
  handleSubmit(makeRequest, e);
}

//Валидация форм
enableValidation(configForm);

// Обработчик отправки формы редактирования профиля
formFormProfile.addEventListener('submit', handleFormProfileSubmit);

// Обработчик отправки формы редактирования аватара профиля
formFormAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Обработчик отправки формы добавления карточки
formFormAdd.addEventListener('submit', handleFormAddSubmit);
