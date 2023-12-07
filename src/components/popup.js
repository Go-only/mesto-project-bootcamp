import { renderCard } from "./card.js";
import { profileBio, profileName, cardList, inputBio, inputLink, inputMesto, inputName, popupTypeAdd, popupTypeEdit, popups } from "./utils.js";

// Открытие popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
};

function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
};

// Закрытие popups по Esc
function closeByEsc(e) {
  if (e.key === 'Escape') {
    const newOpenPopup = document.querySelector('.popup_opened');
    closePopup(newOpenPopup);
  }
};

// Закрытие popups по оверлею и крестику
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

export function handleFormProfileSubmit(e) {
  e.preventDefault();

  const inputNameValue = inputName.value;
  const inputBioValue = inputBio.value;

  profileName.textContent = inputNameValue;
  profileBio.textContent = inputBioValue;
  closePopup(popupTypeEdit);
};

export function handleFormAddSubmit(e) {
  e.preventDefault();

  const inputMestoValue = inputMesto.value;
  const inputLinkValue = inputLink.value;
  renderCard(inputMestoValue, inputLinkValue, cardList);
  closePopup(popupTypeAdd);
  e.target.reset();
};
