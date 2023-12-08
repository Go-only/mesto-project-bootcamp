export const initialCards = [
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

export const cardList = document.querySelector(".cards__list");
export const cardTemplateElement = document.querySelector(".card-template");

export const buttonProfileEdit = document.querySelector(".profile__edit");
export const buttonCardAdd = document.querySelector(".profile__add");
export const popupTypeEdit = document.querySelector(".popup_type_edit");
export const popupTypeAdd = document.querySelector(".popup_type_add");
export const popupTypeImg = document.querySelector(".popup_type_img");
export const profileName = document.querySelector(".profile__name");
export const profileBio = document.querySelector(".profile__bio");
export const bigImg = document.querySelector(".popup__big-img");
export const nameImg = document.querySelector(".popup__name-img");

export const formFormProfile = document.forms["formProfile"]
export const inputName = formFormProfile.querySelector(".form__item_input_name");
export const inputBio = formFormProfile.querySelector(".form__item_input_bio");

export const formFormAdd = document.forms["formAdd"]
export const inputMesto = formFormAdd.querySelector(".form__item_input_mesto");
export const inputLink = formFormAdd.querySelector(".form__item_input_link");

export const popups = document.querySelectorAll('.popup')
