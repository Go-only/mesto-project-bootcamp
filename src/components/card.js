import { bigImg, cardTemplateElement, nameImg, popupTypeImg } from "./constants.js";
import { openPopup } from "./utils.js";

export function renderCard(nameElement, linkElement, containerNode) {
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
  cardImg.alt = nameElement;

  cardImg.addEventListener('click', () => {
    bigImg.src = linkElement;
    bigImg.alt = nameElement;
    nameImg.textContent = nameElement;
    openPopup(popupTypeImg);
  });

  cardHeart.addEventListener('click', function (e) {
    e.target.classList.toggle('card__heart_active');
  });

  cardTrash.addEventListener('click', () => {
    cardElement.remove();
  });

  return cardElement;

}
