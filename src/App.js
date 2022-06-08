import React from 'react';
import './App.css';
import Table from './components/Table';
import FiltersProvider from './context/Filter';

function App() {
  return (
    <FiltersProvider>
      <Table />
    </FiltersProvider>
  );
}

export default App;
