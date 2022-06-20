import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ApiContext from './ApiContext';
// import fetchApiStarWars from '../services/fetchAPI';
const selectOptions = [
  'population',
  'orbital_period',
  'diameter',
  'rotation_period',
  'surface_water',
];
// Monitorias da Luá salavaram muito nesse projeto, pode contratar!!
function ApiProvider({ children }) {
  const [resultAPI, setResultAPI] = useState([]);
  const [titleFilter, setTitleFilter] = useState('');
  const [filterData, setFilterData] = useState([]);
  const [numericFilter, setNumericFilter] = useState([]);
  const [filterType, setFilterType] = useState('population');
  const [operator, setOperator] = useState('maior que');
  const [value, setValue] = useState(0);
  const [options, setOptions] = useState(selectOptions);

  useEffect(() => {
    const fetchApiStarWars = async () => {
      const request = await fetch('https://swapi-trybe.herokuapp.com/api/planets/');
      const requestJson = await request.json();
      setResultAPI(requestJson.results);
      setFilterData(requestJson.results);
    };
    fetchApiStarWars();
  }, []);
  useEffect(() => {
    const Options = [...selectOptions];
    const filterDataPlanets = resultAPI
      .filter((planet) => planet.name.toLowerCase().includes(titleFilter));

    const resultArray = numericFilter.reduce((acc, curr) => acc.filter((planet) => {
      switch (curr.operator) {
      case 'maior que':
        return Number(planet[curr.filterType]) > Number(curr.value);
      case 'menor que':
        return Number(planet[curr.filterType]) < Number(curr.value);
      case 'igual a':
        return Number(planet[curr.filterType]) === Number(curr.value);
      default:
        return true;
      }
    }), filterDataPlanets);

    const deleteNumericFilter = () => {
      const newSelectOptions = numericFilter.reduce((acc, curr) => acc
        .filter((filterTy) => filterTy !== curr.filterType), Options);
      setOptions(newSelectOptions);
    };
    deleteNumericFilter();
    setFilterData(resultArray);
  }, [titleFilter, numericFilter]);

  const handleTitleChange = ({ target }) => {
    setTitleFilter(target.value.toLowerCase());
  };

  const handleNumericFilter = () => {
    const newNumericFilter = {
      filterType,
      operator,
      value,
    };
    setNumericFilter([...numericFilter, newNumericFilter]);
  };

  const handleDeleteNumericFilter = (index) => {
    const numericDeleteFilter = numericFilter.filter((_, i) => i !== index);
    setNumericFilter([...numericDeleteFilter]);
  };
  const handleDeleteAllNumericFilter = () => {
    setNumericFilter([]);
  };
  const contextValue = {
    handleDeleteAllNumericFilter,
    options,
    setOptions,
    filterType,
    setFilterType,
    value,
    setValue,
    operator,
    setOperator,
    numericFilter,
    setNumericFilter,
    filterData,
    setFilterData,
    titleFilter,
    setTitleFilter,
    resultAPI,
    setResultAPI,
    handleTitleChange,
    handleNumericFilter,
    handleDeleteNumericFilter,
  };
  // const valueFetch = { fetchStarWars };
  return (
    <ApiContext.Provider value={ contextValue }>
      {children}
    </ApiContext.Provider>
  );
}

ApiProvider.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
};
export default ApiProvider;
