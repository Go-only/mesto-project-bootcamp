import { renderCard } from "./card.js";
import { cardList, initialCards } from "./constants.js";

initialCards.forEach(function (dataElement) {
  const name = dataElement.name;
  const link = dataElement.link;
  renderCard(name, link, cardList);
});

