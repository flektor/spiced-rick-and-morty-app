import { fetchCharacterData } from "../../utils/fetch-data.js";

const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

export async function createPagination(queryUrl, onPageChanged) {
  //
  async function updatePage(queryUrl, pageIndex = 1) {
    state.data = await fetchCharacterData(queryUrl);
    state.pageIndex = pageIndex;
    pagination.innerHTML = `${state.pageIndex} / ${state.data.info.pages}`;
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
