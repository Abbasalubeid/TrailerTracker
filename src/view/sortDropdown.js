import React from "react";
import "../styles/sortDropdown.css";

export default function SortDropdown(props) {
  function ratingFilterChanged(event) {
    props.setActiveSortingFilter(event.target.value);
  }

  return (
    <div className="sort-dropdown-container">
      <select
        value={props.activeRatingFilter}
        onChange={ratingFilterChanged}
      >
        <option value="" disabled>
          Filter
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