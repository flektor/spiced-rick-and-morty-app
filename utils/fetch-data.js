export const baseUrl = "https://rickandmortyapi.com/api/character/";

export async function fetchCharacter(query) {
  try {
    const response = await fetch(query);
    const object = await response.json();
    if (object.error) {
      throw object.error;
    }
    return object;
  } catch (error) {
    return {
      info: {
        pages: 0,
      },
      results: [],
    };
  }
}
