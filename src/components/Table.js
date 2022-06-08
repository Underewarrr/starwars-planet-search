import React, { useEffect, useState } from 'react';
import { useFilters } from '../context/Filter';

const Table = () => {
  const { filterByName: { name },
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues } = useFilters();

  const [planets, setPlanets] = useState([]);
  const [localFilter, setLocalFilter] = useState({
    column: 'population',
    comparision: 'maior que',
    value: 0,
  });

  useEffect(() => {
    const reqAndSetPlanets = async () => {
      const { results } = await (await fetch('https://swapi-trybe.herokuapp.com/api/planets/')).json();
      setPlanets(results);
    };
    setColumnOptions([
      'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
    ]);
    reqAndSetPlanets();
  }, []);

  const handleClick = () => {
    if (!localFilter.column) return new Error('Não há nenhum filtro selecionado!');

    const verifyEqualColumn = filterByNumericValues
      .find((filter) => filter.column === localFilter.column);

    if (verifyEqualColumn) {
      const SubscribeEqualState = filterByNumericValues.map((obj) => {
        if (obj.column === verifyEqualColumn.column) return { ...localFilter };
        return obj;
      });
      setFilterByNumericValues(SubscribeEqualState);
    } else setFilterByNumericValues([...filterByNumericValues, { ...localFilter }]);

    const newOptions = columnOptions.filter((curr) => curr !== localFilter.column);
    const newColumn = newOptions[0];
    setColumnOptions(newOptions);

    setLocalFilter({ ...localFilter, column: newColumn });
  };

  let planetsFilter = planets;
  filterByNumericValues.forEach((_, i) => {
    planetsFilter = planetsFilter.filter((planet) => {
      const { comparision, column, value } = filterByNumericValues[i];
      if (comparision === 'maior que') return +planet[column] > value;
      if (comparision === 'menor que') return +planet[column] < value;
      if (comparision === 'igual a') return +planet[column] === value;
      return true;
    });
  });

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

  const filterByNameInput = (planet) => (
    planet.name.toLowerCase().includes(name.toLowerCase())
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
    <>
      <input
        data-testid="name-filter"
        onChange={ ({ target: { value: nameV } }) => setFilterByName({ name: nameV }) }
      />
      <select
        onChange={ ({ target: { value: columnString } }) => setLocalFilter({
          ...localFilter,
          column: columnString,
        }) }
        data-testid="column-filter"
        value={ localFilter.column }
      >
        {columnOptions
        && columnOptions.map((current) => <option key={ current }>{current}</option>)}
      </select>
      <select
        onChange={
          ({ target: { value: numericString } }) => setLocalFilter({
            ...localFilter,
            comparision: numericString,
          })
        }
        data-testid="comparison-filter"
        value={ localFilter.comparision }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
      </select>

      <input
        type="number"
        data-testid="value-filter"
        value={ localFilter.value }
        onChange={
          ({ target: { value: numericV } }) => setLocalFilter({
            ...localFilter,
            value: +numericV,
          })
        }
      />
      <button
        type="button"
        onClick={ handleClick }
        data-testid="button-filter"
      >
        Filter
      </button>
      <table border="1">
        <caption>Star Wars</caption>
        <tbody>
          {tableTr}
          { planetsFilter
            .filter(filterByNameInput)
            .map(mapPlanets)}
        </tbody>
      </table>
    </>
  );
};

export default Table;
