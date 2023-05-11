const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
const maxPage = 1;
const page = 1;
const searchQuery = "";

updateCardContainer(1);

function updateCardContainer(pageIndex) {
  // fetch the page

  const mockedData = {
    info: {
      count: 826,
      pages: 42,
      next: "https://rickandmortyapi.com/api/character/?page=2",
      prev: null,
    },
    results: [
      {
        id: 361,
        name: "Toxic Rick",
        status: "Dead",
        species: "Humanoid",
        type: "Rick's Toxic Side",
        gender: "Male",
        origin: {
          name: "Alien Spa",
          url: "https://rickandmortyapi.com/api/location/64",
        },
        location: {
          name: "Earth",
          url: "https://rickandmortyapi.com/api/location/20",
        },
        image: "https://rickandmortyapi.com/api/character/avatar/361.jpeg",
        episode: ["https://rickandmortyapi.com/api/episode/27"],
        url: "https://rickandmortyapi.com/api/character/361",
        created: "2018-01-10T18:20:41.703Z",
      },
    ],
  };

  for (const character of mockedData.results) {
    const card = createCharacterCard(character);
    const li = document.createElement("li");
    li.innerHTML = card;
    cardContainer.appendChild(li);
  }
}

function createCharacterCard(cardData) {
  const { id, name, status, species, episode } = cardData;

  const htmlText = `  <div class="card__image-container">
    <img
      class="card__image"
      src="https://rickandmortyapi.com/api/character/avatar/${id}.jpeg"
      alt="Rick Sanchez"
    />
    <div class="card__image-gradient"></div>
  </div>
  <div class="card__content">
    <h2 class="card__title">${name}</h2>
    <dl class="card__info">
      <dt class="card__info-title">Status</dt>
      <dd class="card__info-description">${status}</dd>
      <dt class="card__info-title">Type</dt>
      <dd class="card__info-description">${species}</dd>
      <dt class="card__info-title">Occurrences</dt>
      <dd class="card__info-description">${episode.length}</dd>
    </dl>
  </div>`;

  return htmlText;
}
