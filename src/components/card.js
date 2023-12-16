import { myId } from "../index.js";
import { deleteCard, deleteLikeCard, likeCard } from "./api.js";
import { bigImg, cardTemplateElement, nameImg, popupTypeImg } from "./constants.js";
import { openPopup } from "./modal.js";

export function renderCard(card, containerNode, position = 'append') {
  const newCard = createCard(card);
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

function createCard(card) {
  const templateElement = cardTemplateElement.content.cloneNode(true);
  const cardElement = templateElement.querySelector(".template-element");
  const cardName = templateElement.querySelector(".card__name");
  const cardImg = templateElement.querySelector(".card__img");
  const cardTrash = templateElement.querySelector(".card__trash");
  const cardHeart = templateElement.querySelector(".card__heart");
  const cardLikes = templateElement.querySelector(".card__likes");
  let likeElement = card.likes;
  console.log(cardLikes);
  if (card.owner._id !== myId) {
    cardTrash.remove();
  }

  cardName.textContent = card.name;
  cardImg.src = card.link;
  cardImg.alt = card.name;

  cardImg.addEventListener('click', () => {
    bigImg.src = card.link;
    bigImg.alt = card.name;
    nameImg.textContent = card.name;
    openPopup(popupTypeImg);
  });

  if (likeElement.length !== 0) {
    for (let i = 0; i < likeElement.length; i++) {
      if (likeElement[i]._id === myId) {
        cardHeart.classList.add('card__heart_active');
      }
    }
  }

  cardHeart.addEventListener('click', function (e) {

    if (!cardHeart.classList.contains('card__heart_active')) {
      likeCard(card._id)
        .then((result) => {
          console.log(result.likes.length);
          cardLikes.textContent = result.likes.length;
          e.target.classList.add('card__heart_active');
        })
        .catch((err) => console.error("error", err))
    } else {
      deleteLikeCard(card._id)
        .then(() => {
          console.log(result.likes.length);
          e.target.classList.remove('card__heart_active');
          cardLikes.textContent = result.likes.length;
        })
        .catch((err) => console.error("error", err))
    }
    e.target.classList.toggle('card__heart_active');
  });

  cardTrash.addEventListener('click', () => {
    deleteCard(card._id)
      .then()
      .catch((err) => console.error("error", err));
    cardElement.remove();
  });

  return cardElement;

}
