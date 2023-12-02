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
const cardTemplateElement = document.querySelector(".card-template");

const buttonProfileEdit = document.querySelector(".profile__edit");
const buttonCardAdd = document.querySelector(".profile__add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeAdd = document.querySelector(".popup_type_add");
const ProfileName = document.querySelector(".profile__name");
const ProfileBio = document.querySelector(".profile__bio");

const formFormProfile = document.querySelector("form[name='formProfile']");
const inputName = formFormProfile.querySelector(".form__item_input_name");
const inputBio = formFormProfile.querySelector(".form__item_input_bio");

const formFormAdd = document.querySelector("form[name='formAdd']");
const inputMesto = formFormAdd.querySelector(".form__item_input_mesto");
const inputLink = formFormAdd.querySelector(".form__item_input_link");

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

initialCards.forEach(function (dataElement) {
  const name = dataElement.name;
  const link = dataElement.link;
  renderCard(name, link, cardList);
});

function renderCard(nameElement, linkElement, containerNode, position) {
  const newCard = createCard(nameElement, linkElement);
  containerNode.prepend(newCard);
}

function createCard(nameElement, linkElement) {
  const templateElement = cardTemplateElement.content.cloneNode(true);
  const cardElement = templateElement.querySelector(".template-element");
  const cardName = templateElement.querySelector(".card__name");
  const cardImg = templateElement.querySelector(".card__img");
  const cardTrash = templateElement.querySelector(".card__trash");
  const cardHeart = templateElement.querySelector(".card__heart");

  cardName.textContent = nameElement;
  cardImg.src = linkElement;

  cardImg.addEventListener('click', () => {
    console.log('img')
  });
  cardHeart.addEventListener('click', function (e) {
    e.target.classList.toggle('card__heart_active');
  });
  cardTrash.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;

}

function handleFormProfileSubmit(e) {
  e.preventDefault();

  const inputNameValue = inputName.value;
  const inputBioValue = inputBio.value;

  ProfileName.textContent = inputNameValue;
  ProfileBio.textContent = inputBioValue;
  closePopups(e);
}

function handleFormAddSubmit(e) {
  e.preventDefault();

  const inputMestoValue = inputMesto.value;
  const inputLinkValue = inputLink.value;

  renderCard(inputMestoValue, inputLinkValue, cardList);

  closePopups(e);
}



/* Прослушивание событий */

buttonProfileEdit.addEventListener('click', () => openPopup(popupTypeEdit));
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));
popupTypeEdit.addEventListener('click', closePopups);
popupTypeAdd.addEventListener('click', closePopups);

formFormProfile.addEventListener('submit', handleFormProfileSubmit);
formFormAdd.addEventListener('submit', handleFormAddSubmit);



