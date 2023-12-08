import { popups } from "./constants.js";
import { closePopup } from "./utils.js";

// Закрытие popup по Esc
export function closeByEsc(e) {
  if (e.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened')
    closePopup(openedPopup);
  }
};

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
