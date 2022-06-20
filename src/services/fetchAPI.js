const PLANETS_API = 'https://swapi-trybe.herokuapp.com/api/planets/';

async function fetchApiStarWars() {
  const request = await fetch(PLANETS_API);
  const requestJson = await request.json();
  return requestJson;
}

export default fetchApiStarWars;
