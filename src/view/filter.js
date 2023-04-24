import React from "react";
import "../styles/filter.css"

export default function Filter(props) {

    function genreChangedACB(event){
        props.setActiveGenre(event.target.value)
    }

    return (
        <div className="filter-container">
            <button value="28" onClick={genreChangedACB}>Action</button>
            <button value="878" onClick={genreChangedACB}>Science fiction</button>
            <button value="12" onClick={genreChangedACB}>Adventure</button>
            <button value="14" onClick={genreChangedACB}>Fantasy</button>
            <button value="10752" onClick={genreChangedACB}>War</button>
            <button value="16" onClick={genreChangedACB}>Animation</button>
            <button value="18" onClick={genreChangedACB}>Drama</button>
            <button value="27" onClick={genreChangedACB}>Horror</button>
        </div>
    );
}