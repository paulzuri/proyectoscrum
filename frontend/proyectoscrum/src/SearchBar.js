import React from 'react';
import './SearchBar.css';

const SearchBar = () => {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        placeholder="Buscar productos..."
        className="search-input"
      />
      <button className="search-button">Buscar</button>
    </div>
  );
};

export default SearchBar;
