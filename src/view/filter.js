import React from "react";
import "../styles/filter.css"

export default function Filter(props) {

    function genreChangedACB(event){
        props.setActiveGenre(parseInt(event.target.value))
    }    

    return (
        <div className="filter-container">
            {props.genres.map(genre => (
                <button
                    key={genre.id}
                    className={props.activeGenre === genre.id ? "active" : ""}
                    value={genre.id}
                    onClick={genreChangedACB}
                >
                    {genre.name}
                </button>
            ))}
        </div>
    );
}