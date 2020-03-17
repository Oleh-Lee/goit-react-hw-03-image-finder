import React from "react";

const SearchBar = ({ handleOnSubmit, handleChange, searchQuery }) => (
  <header className="Searchbar">
    <form className="SearchForm" onSubmit={handleOnSubmit}>
      <button type="submit" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        onChange={handleChange}
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
        value={searchQuery}
      />
    </form>
  </header>
);

export default SearchBar;
