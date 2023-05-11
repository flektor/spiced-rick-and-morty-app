import { createCharacterCard } from "./components/card/card.js";
import { fetchCharacterData } from "./components/utils/fetch-data.js";
import { updatePegination } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');

const state = {
  maxPageIndex: 1,
  pageIndex: 1,
  searchQuery: "",
};

const onPageChanged = (pageIndex) => showPage(pageIndex);

showPage(1).then(() => {
  updatePegination(state.pageIndex, state.maxPageIndex, onPageChanged);
});

async function showPage(pageIndex, maxPageIndex) {
  if (pageIndex < 0) return;
  if (pageIndex > maxPageIndex) return;

  const data = await fetchCharacterData(pageIndex);
  state.maxPageIndex = data.info.pages;
  state.pageIndex = pageIndex;

  updateCardContainer(data.results);
  updatePegination(pageIndex, state.maxPageIndex, onPageChanged);
  return data;
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
