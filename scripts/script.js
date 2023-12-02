const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const cardList = document.querySelector(".cards__list");
const cardTemplateElement = document.querySelector(".card-template").content.querySelector(".card");
/*
console.dir(cardTemplateElement);
console.dir(cardList);
*/


const buttonProfileEdit = document.querySelector(".profile__edit");
const buttonCardAdd = document.querySelector(".profile__add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupCloseElement = document.querySelector(".popup__close");
const ProfileName = document.querySelector(".profile__name");
const ProfileBio = document.querySelector(".profile__bio");

const formFormProfile = document.querySelector("form[name='formProfile']");
const inputName = document.querySelector(".form__item_input_name");
const inputBio = document.querySelector(".form__item_input_bio");

const formFormAdd = document.querySelector("form[name='formAdd']");
const inputMesto = document.querySelector(".form__item_input_mesto");
const inputLink = document.querySelector(".form__item_input_link");


/* Popups */

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

function closePopups(e) {
  if (e.target === e.currentTarget || e.target.classList.contains("popup__close")) {

    const activePopup = document.querySelector(".popup_opened");
    closePopup(activePopup);
    inputName.value = ProfileName.textContent;
    inputBio.value = ProfileBio.textContent;
    inputMesto.value = "";
    inputLink.value = "";

  };
};


/* Добавление карточек */

function createCard(dataCards) {
  const cardElement = cardTemplateElement;
  const cardName = cardElement.querySelector(".card__name");
  const cardImg = cardElement.querySelector(".card__img");
  cardElement.textContent(dataCards)
}

/* Прослушивание событий */

buttonProfileEdit.addEventListener('click', () => openPopup(popupTypeEdit));
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));
popupTypeEdit.addEventListener('click', closePopups);
popupTypeAdd.addEventListener('click', closePopups);

/*
// Находим форму в DOM
const formElement = // Воспользуйтесь методом querySelector()
// Находим поля формы в DOM
const nameInput = // Воспользуйтесь инструментом .querySelector()
const jobInput = // Воспользуйтесь инструментом .querySelector()

  function handleFormSubmit(e) {
    e.preventDefault();

    // Получите значение полей jobInput и nameInput из свойства value

    // Выберите элементы, куда должны быть вставлены значения полей

    // Вставьте новые значения с помощью textContent
  }

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formFormProfile.addEventListener('submit', handleFormSubmit);
*/
