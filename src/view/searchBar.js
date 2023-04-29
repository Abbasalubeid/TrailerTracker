import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import "../styles/searchBar.css";

export default function SearchBar(props) {

  function onFormChange(event) {
    event.preventDefault();
    props.userSearched(event.target.value);
  }

  function onFormSubmit(event) {
    event.preventDefault();
    props.userSearched(event.target.searchInput.value)
  }

  return (
    <form onChange={onFormChange} onSubmit={onFormSubmit}>
      <div className={`search-bar ${props.hasError ? "error" : ""}`}>
        <div
          className={`search-icon ${
            props.hasError ? "error shake-animation" : ""
          }`}
        >
          <FaSearch />
        </div>
        <input
          className={`search-input ${
            props.hasError ? "error shake-animation" : ""
          }`}
          type="text"
          placeholder="Search with titles"
          name="searchInput"
        />
      </div>
    </form>
  );
}
