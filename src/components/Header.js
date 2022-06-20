import React, { useContext } from 'react';
import ApiContext from '../context/ApiContext';

function Header() {
  const {
    numericFilter,
    setFilterType,
    value,
    setValue,
    setOperator,
    handleTitleChange,
    handleNumericFilter,
    handleDeleteNumericFilter,
    filterType,
    operator,
    options,
    handleDeleteAllNumericFilter,
  } = useContext(ApiContext);

  return (
    <div>
      <h1>Star Wars API</h1>
      <form>
        <input
          type="text"
          placeholder="NamePlanet"
          onChange={ handleTitleChange }
          data-testid="name-filter"
        />
        <select
          value={ filterType }
          data-testid="column-filter"
          onChange={ ({ target }) => setFilterType(target.value) }
        >
          {options.map((option) => (
            <option key={ option } value={ option }>
              { option }
            </option>
          ))}
        </select>
        <select
          value={ operator }
          data-testid="comparison-filter"
          onChange={ ({ target }) => setOperator(target.value) }
        >
          <option key="maior que" value="maior que">maior que</option>
          <option key="menor que" value="menor que">menor que</option>
          <option key="igual a" value="igual a">igual a</option>
        </select>
        <input
          type="number"
          placeholder="Value"
          data-testid="value-filter"
          value={ value }
          onChange={ ({ target }) => setValue(target.value) }
        />
        <button
          type="button"
          onClick={ handleNumericFilter }
          data-testid="button-filter"
        >
          Filter
        </button>
      </form>
      {numericFilter.map((filter, index) => (
        <div key={ index } data-testid="filter">
          <p
            key={ `${filter.filterType}-${index}` }
          >
            {`${filter.filterType} ${filter.operator} ${filter.value}`}

          </p>
          <button
            type="button"
            onClick={ () => handleDeleteNumericFilter(index) }
          >
            Delete
          </button>

        </div>
      ))}
      <button
        type="button"
        data-testid="button-remove-filters"
        onClick={ handleDeleteAllNumericFilter }
      >
        Delete All
      </button>
    </div>
  );
}

export default Header;
