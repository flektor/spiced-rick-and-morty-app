export async function fetchCharacterData(url) {
  try {
    const response = await fetch(url);
    const dataApi = await response.json();
    return dataApi;
  } catch (error) {
    console.error(error);
  }
}
