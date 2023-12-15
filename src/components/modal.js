import { popups } from "./constants.js";

// Открытие popup
export function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', closeByEsc);
};

// Закрытие popup
export function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', closeByEsc);
};

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
