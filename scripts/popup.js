import { renderCard } from "./card.js";
import { ProfileBio, ProfileName, buttonCardAdd, buttonProfileEdit, cardList, formFormAdd, formFormProfile, inputBio, inputLink, inputMesto, inputName, popupTypeAdd, popupTypeEdit, popupTypeImg } from "./constants.js";

export function openPopup(popup) {

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

buttonProfileEdit.addEventListener('click', () => openPopup(popupTypeEdit));
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));
popupTypeEdit.addEventListener('click', closePopups);
popupTypeAdd.addEventListener('click', closePopups);
popupTypeImg.addEventListener('click', closePopups);
formFormProfile.addEventListener('submit', handleFormProfileSubmit);
formFormAdd.addEventListener('submit', handleFormAddSubmit);
