// prettier-ignore
import { createCharacterCard } from "./components/card/card.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";
import { onSearch } from "./components/search-bar/search-bar.js";
import { baseUrl } from "./utils/fetch-data.js";

const cardContainer = document.querySelector('[data-js="card-container"]');

const state = {
  pageIndex: 0,
  data: null,
};

onSearch((query) => {
  const url = baseUrl + query;
  createPagination(url, onPageChanged);
});

createPagination(baseUrl, onPageChanged);

function onPageChanged(newState) {
  state.pageIndex = newState.pageIndex;
  state.data = newState.data;
  updateCardContainer(state.data.results);
}

async function updateCardContainer(cardsData) {
  cardContainer.innerHTML = "";
  for (const character of cardsData) {
    const card = createCharacterCard(character);
    const li = document.createElement("li");
    li.innerHTML = card;
    cardContainer.appendChild(li);
  }
}
