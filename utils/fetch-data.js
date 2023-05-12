export function nameQueryUrl(name = "") {
  return `https://rickandmortyapi.com/api/character/?name=${name}`;
}

export async function fetchCharacterData(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}
