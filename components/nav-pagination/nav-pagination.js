const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

export function updatePegination(pageIndex, maxPageIndex, onPageChanged) {
  if (pageIndex < 0) return;
  if (pageIndex > maxPageIndex) return;

  pagination.innerHTML = `${pageIndex} / ${maxPageIndex}`;
  prevButton.onclick = () => onPageChanged(pageIndex - 1);
  nextButton.onclick = () => onPageChanged(pageIndex + 1);
}
