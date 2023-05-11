export async function fetchCharacterData(pageIndex) {
  try {
    const url = `https://rickandmortyapi.com/api/character/?page=${pageIndex}`;
    const response = await fetch(url);
    const dataApi = await response.json();
    return dataApi;
  } catch (error) {
    console.error(error);
  }
}
