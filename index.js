import { createCharacterCard } from "./components/card/card.js";
import { fetchCharacterData } from "./components/utils/fetch-data.js";
import { updatePagination } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBar = document.querySelector('[data-js="search-bar"]');

const state = {
  maxPageIndex: 1,
  pageIndex: 1,
};

const pageUrl = defaultQueryUrl(1);

const onPageChanged = (pageIndex, prev, next) => {
  if (pageIndex < 0) {
    if (!prev) return;
    showPage(prev);
    return;
  }

  if (!next) return;

  showPage(next);
};

showPage(pageUrl).then((data) => {
  const __onPageChanged = (indexPage) =>
    onPageChanged(indexPage, data.info.prev, data.info.next);

  updatePagination(state.pageIndex, state.maxPageIndex, __onPageChanged);
});

searchBar.addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const search = Object.fromEntries(formData);
  const url = nameQueryUrl(search.query);
  showPage(url);
});

async function showPage(queryUrl) {
  const data = await fetchCharacterData(queryUrl);
  state.maxPageIndex = data.info.pages;
  state.pageIndex = getPageIndex(data);

  updateCardContainer(data.results);

  const __onPageChanged = (indexPage) =>
    onPageChanged(indexPage, data.info.prev, data.info.next);

  updatePagination(state.pageIndex, state.maxPageIndex, __onPageChanged);
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

function getPageIndex(data) {
  if (!data.info.next) return 1;
  const props = data.info.next.split("?")[1].split("&");

  for (const prop of props) {
    if (prop.includes("page")) {
      return Number.parseInt(prop.split("=")[1]) - 1;
    }
  }
  return 1;
}

function defaultQueryUrl(pageIndex) {
  return `https://rickandmortyapi.com/api/character/?page=${pageIndex}`;
}
function nameQueryUrl(name) {
  return `https://rickandmortyapi.com/api/character/?name=${name}`;
}
