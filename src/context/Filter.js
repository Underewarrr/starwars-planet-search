import React, { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FilterContext = createContext();

export default function FilterProvider({ children }) {
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setFilterByNumericValues] = useState([{
    column: 'population',
    comparision: '',
    value: 0,
  },
  ]);

  return (
    <FilterContext.Provider
      value={ {
        filterByName,
        setFilterByName,
        filterByNumericValues,
        setFilterByNumericValues,
      } }
    >
      { children }
    </FilterContext.Provider>
  );
}
export function useFilters() {
  const context = useContext(FilterContext);
  const { filterByName, setFilterByName,
    filterByNumericValues, setFilterByNumericValues } = context;
  return { filterByName,
    setFilterByName,
    filterByNumericValues,
    setFilterByNumericValues };
}
FilterProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};
