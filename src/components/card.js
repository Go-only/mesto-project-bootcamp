import { myId } from "../index.js";
import { deleteCard } from "./api.js";
import { bigImg, cardList, cardTemplateElement, nameImg, popupTypeImg } from "./constants.js";
import { openPopup } from "./modal.js";

export function renderCard(nameElement, linkElement, idElement, ownerElementId, containerNode, position = 'append') {
  const newCard = createCard(nameElement, linkElement, idElement, ownerElementId);
  switch (position) {
    case 'append':
      containerNode.append(newCard);
      break;
    case 'prepend':
      containerNode.prepend(newCard);
      break;
    default:
      console.log('Не верное значение для параметра position');
      break;
  }


}

function createCard(nameElement, linkElement, idElement, ownerElementId) {
  const templateElement = cardTemplateElement.content.cloneNode(true);
  const cardElement = templateElement.querySelector(".template-element");
  const cardName = templateElement.querySelector(".card__name");
  const cardImg = templateElement.querySelector(".card__img");
  const cardTrash = templateElement.querySelector(".card__trash");
  const cardHeart = templateElement.querySelector(".card__heart");

  if (ownerElementId !== myId) {
    cardTrash.remove();
  }

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
    deleteCard(idElement)
      .then()
      .catch((err) => console.error("error", err));
    cardElement.remove();
  });

  return cardElement;

}
