import './pages/index.css';
import { renderCard } from "./components/card.js";
import { openPopup, closePopup } from "./components/modal.js";
import { buttonAvatarEdit, buttonCardAdd, buttonProfileEdit, cardList, formFormAdd, formFormAvatar, formFormProfile, inputAvatarLink, inputBio, inputLink, inputMesto, inputName, popupTypeAdd, popupTypeAvatar, popupTypeEdit, profileAvatar, profileBio, profileName } from './components/constants.js';
import { configForm, enableValidation } from './components/validate.js';
import { addCard, editAvatarProfile, editProfile, getAllCards, getInfoProfile } from './components/api.js';

export let myId;

//Рендеринг карточек c сервера
getAllCards()
  .then((resultCards) => {
    resultCards.forEach((card) => {
      renderCard(card, cardList);
    });
  })
  .catch((err) => console.error("error", err));

//Рендеринг информации профиля c сервера
getInfoProfile()
  .then((resultProfile) => {
    profileName.textContent = resultProfile.name;
    profileBio.textContent = resultProfile.about;
    profileAvatar.src = resultProfile.avatar;
    myId = resultProfile._id;
  })
  .catch((err) => console.error("error", err));


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

// Функция редактирования профиля
export function handleFormProfileSubmit(e) {
  e.preventDefault();

  const inputNameValue = inputName.value;
  const inputBioValue = inputBio.value;

  profileName.textContent = inputNameValue;
  profileBio.textContent = inputBioValue;

  const newDataProfile = {
    name: inputNameValue,
    about: inputBioValue
  };

  editProfile(newDataProfile)
    .then((updateDataProfile) => {
      profileName.textContent = updateDataProfile.name;
      profileBio.textContent = updateDataProfile.about;
    })
    .catch((err) => console.error("error", err));
  closePopup(popupTypeEdit);
};

// Функция редактирования аватара профиля
export function handleFormAvatarSubmit(e) {
  e.preventDefault();
  const inputAvatarLinkValue = inputAvatarLink.value;
  console.log(inputAvatarLinkValue);

  editAvatarProfile(inputAvatarLinkValue)
    .then(() => {
      profileAvatar.src = inputAvatarLinkValue;
    })
    .catch((err) => console.error("error", err));
  closePopup(popupTypeAvatar);
  e.target.reset();
};

// Функция добавления карточки
export function handleFormAddSubmit(e) {
  e.preventDefault();
  const inputMestoValue = inputMesto.value;
  const inputLinkValue = inputLink.value;
  const newDataCard = {
    name: inputMestoValue,
    link: inputLinkValue,
  }
  addCard(newDataCard)
    .then((newDataCard) => renderCard(newDataCard, cardList, 'prepend'))
    .catch((err) => console.error("error", err));
  closePopup(popupTypeAdd);
  e.target.reset();
};

//Валидация форм
enableValidation(configForm);

// Обработчик отправки формы редактирования профиля
formFormProfile.addEventListener('submit', handleFormProfileSubmit);

// Обработчик отправки формы редактирования аватара профиля
formFormAvatar.addEventListener('submit', handleFormAvatarSubmit);

// Обработчик отправки формы добавления карточки
formFormAdd.addEventListener('submit', handleFormAddSubmit);
