const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

export function updatePagination(pageIndex, maxPageIndex, onPageChanged) {
  if (pageIndex < 1) return;
  if (pageIndex > maxPageIndex) return;

  pagination.innerHTML = `${pageIndex} / ${maxPageIndex}`;
  prevButton.onclick = () => onPageChanged(-1);
  nextButton.onclick = () => onPageChanged(1);
}
