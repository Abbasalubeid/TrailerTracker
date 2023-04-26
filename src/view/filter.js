import React from "react";
import "../styles/filter.css"

export default function Filter(props) {

    function filterChangedACB(event){
        props.setActiveFilter(parseInt(event.target.value))
    }    

    return (
        <div className="filter-container">
            {props.filters.map(filter => (
                <button
                    key={filter.id}
                    className={props.activeFilter === filter.id ? "active" : ""}
                    value={filter.id}
                    onClick={filterChangedACB}
                >
                    {filter.name}
                </button>
            ))}
        </div>
    );
}