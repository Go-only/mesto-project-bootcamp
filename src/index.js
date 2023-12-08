import './pages/index.css';
import { renderCard } from "./components/card.js";
import { handleFormAddSubmit, handleFormProfileSubmit, openPopup } from "./components/modal.js";
import { buttonCardAdd, buttonProfileEdit, cardList, formFormAdd, formFormProfile, initialCards, inputBio, inputName, popupTypeAdd, popupTypeEdit, profileBio, profileName } from './components/utils.js';

initialCards.forEach(({ name, link }) => {
  renderCard(name, link, cardList);
});



// Обработчики событий
buttonProfileEdit.addEventListener('click', function () {
  inputName.value = profileName.textContent;
  inputBio.value = profileBio.textContent;
  openPopup(popupTypeEdit);
});
buttonCardAdd.addEventListener('click', () => openPopup(popupTypeAdd));
formFormProfile.addEventListener('submit', handleFormProfileSubmit);
formFormAdd.addEventListener('submit', handleFormAddSubmit);
