import { fetchCharacter } from "../../utils/fetch-data.js";

const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

export async function createPagination(queryUrl, onPageChanged) {
  //
  async function updatePage(queryUrl, pageIndex = 1) {
    state.data = await fetchCharacter(queryUrl);
    const pages = state.data.info.pages;
    state.pageIndex = pages === 0 ? 0 : pageIndex;
    pagination.innerHTML = `${state.pageIndex} / ${pages}`;
    onPageChanged(state);
    return state;
  }

  const state = {};
  await updatePage(queryUrl);

  prevButton.onclick = () => {
    if (state.pageIndex <= 1) return;

    const prev = state.data.info.prev;
    if (!prev) return;
    updatePage(prev, state.pageIndex - 1);
  };

  nextButton.onclick = () => {
    const { next, pages } = state.data.info;
    if (state.pageIndex >= pages) return;
    if (!next) return;
    updatePage(next, state.pageIndex + 1);
  };
}
