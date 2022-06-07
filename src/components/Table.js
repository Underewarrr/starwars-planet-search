import React, { useEffect, useState } from 'react';
// import { useFilters } from '../context/Filter';

const Table = () => {
  const [planets, setPlanets] = useState([]);
  useEffect(() => {
    const reqAndSetPlanets = async () => {
      const { results } = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
      setPlanets(results);
    };
    reqAndSetPlanets();
  }, []);

  const mapPlanets = (planet) => (
    <tr key={ planet.name }>
      <td>{planet.name}</td>
      <td>{planet.rotation_period}</td>
      <td>{planet.orbital_period}</td>
      <td>{planet.diameter}</td>
      <td>{planet.climate}</td>
      <td>{planet.gravity}</td>
      <td>{planet.terrain}</td>
      <td>{planet.surface_water}</td>
      <td>{planet.population}</td>
      <td>{planet.films}</td>
      <td>{planet.created}</td>
      <td>{planet.edited}</td>
      <td>{planet.url}</td>
    </tr>
  );
  const tableTr = (
    <tr>
      <th>Name</th>
      <th>Rotation Period</th>
      <th>Orbital Period</th>
      <th>Diameter</th>
      <th>Climate</th>
      <th>Gravity</th>
      <th>Terrain</th>
      <th>Surface Water</th>
      <th>Population</th>
      <th>Films</th>
      <th>Created</th>
      <th>Edited</th>
      <th>URL</th>
    </tr>);

  return (
    <table border="1">
      <caption>Star Wars</caption>
      <tbody>
        {tableTr}
        { planets.map(mapPlanets) }
      </tbody>
    </table>
  );
};

export default Table;
