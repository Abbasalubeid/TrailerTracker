import React from "react";
import "../styles/sortDropdown.css";

export default function SortDropdown(props) {
  function ratingFilterChanged(event) {
    props.setActiveRatingFilter(event.target.value);
  }

  return (
    <div className="sort-dropdown-container">
      <select
        value={props.activeRatingFilter}
        onChange={ratingFilterChanged}
      >
        <option disabled value="filters">
        Filters
        </option>
        {props.ratingFilters.map((filter) => (
          <option key={filter.id} value={filter.id}>
            {filter.name}
          </option>
        ))}
      </select>
    </div>
  );
}