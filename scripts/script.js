const buttonProfileEdit = document.querySelector(".profile__edit");
const buttonCardAdd = document.querySelector(".profile__add");
const popupTypeEdit = document.querySelector(".popup_type_edit");
const popupTypeAdd = document.querySelector(".popup_type_add");
const popupCloseElement = document.querySelector(".popup__close");
const ProfileName = document.querySelector(".profile__name");
const ProfileBio = document.querySelector(".profile__bio");

const inputName = document.querySelector(".form__item_input_name");
const inputBio = document.querySelector(".form__item_input_bio");
const inputMesto = document.querySelector(".form__item_input_mesto");
const inputLink = document.querySelector(".form__item_input_link");

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

buttonProfileEdit.addEventListener('click', () => openPopup(popupTypeEdit));
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));
popupTypeEdit.addEventListener('click', closePopups);
popupTypeAdd.addEventListener('click', closePopups);

