// prettier-ignore
import { nameQueryUrl } from "./utils/fetch-data.js";
import { createCharacterCard } from "./components/card/card.js";
import { createPagination } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');

const state = {
  pageIndex: 0,
  data: null,
};

createPagination(nameQueryUrl(), onPageChanged);

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const search = Object.fromEntries(formData);
  const url = nameQueryUrl(search.query);
  createPagination(url, onPageChanged);
});

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
