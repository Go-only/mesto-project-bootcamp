import { myId } from "../index.js";
import { deleteCard, deleteLikeCard, likeCard } from "./api.js";
import { bigImg, buttonFormDeleteCard, cardTemplateElement, formFormDeleteCard, nameImg, popupTypeImg } from "./constants.js";
import { closePopup, openPopup } from "./modal.js";
import { handleSubmit } from "./utils.js";
import { configForm, showButton } from "./validate.js";

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
  const popupTypeDeleteCard = document.querySelector(".popup_type_delete-card");
  const likes = card.likes;
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

  if (likes.length !== 0) {
    likes.forEach(like => {
      if (like._id === myId) {
        cardHeart.classList.add('card__heart_active');
      }
    });
  }

  cardHeart.addEventListener('click', function (e) {

    if (!cardHeart.classList.contains('card__heart_active')) {
      likeCard(card._id)
        .then((result) => {
          cardLikes.textContent = result.likes.length;
          e.target.classList.add('card__heart_active');
        })
        .catch((err) => console.error("error", err))
    } else {
      deleteLikeCard(card._id)
        .then((result) => {
          e.target.classList.remove('card__heart_active');
          cardLikes.textContent = result.likes.length;
        })
        .catch(console.error);
    }
  });

  cardLikes.textContent = likes.length;

  cardTrash.addEventListener('click', () => {
    openPopup(popupTypeDeleteCard);

    formFormDeleteCard.addEventListener('submit', (e) => {
      handleFormDeleteCardSubmit(e, card);
    });
  });


  // Функция прелоадер
  function renderLoading(evt, isLoading) {
    const formEvent = evt.submitter;
    if (isLoading) {
      formEvent.textContent = 'Удаление...';
    } else {
      formEvent.textContent = 'Да';
    }
  }

  // Функция удаления карточки
  function handleFormDeleteCardSubmit(e, card) {
    e.preventDefault();
    renderLoading(e, true)

    deleteCard(card._id)
      .then(() => {
        cardElement.remove();
        closePopup(popupTypeDeleteCard);
      })
      .catch(console.error)
      .finally(() => renderLoading(e, false));
  }

  /*   // Функция удаления карточки
    function handleFormDeleteCardSubmit(e, card) {
      function makeRequest() {
        return deleteCard(card._id)
          .then(() => {
            cardElement.remove();
            closePopup(popupTypeDeleteCard);
          });
      }
      handleSubmit(makeRequest, e, "Удаление...");
      showButton(buttonFormDeleteCard, configForm);
    } */

  return cardElement;

}
