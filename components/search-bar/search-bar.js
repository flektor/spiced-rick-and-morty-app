const searchBar = document.querySelector('[data-js="search-bar"]');

export function onSearch(callback) {
  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const search = Object.fromEntries(formData);
    callback(`?name=${search.query}`);
  });
}
