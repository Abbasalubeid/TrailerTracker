import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/moviePoster.css";
import { NavLink } from "react-router-dom";

export default function MoviePoster(props) {

  function setCurrentMovieACB(){
    props.onMovieChoice(props.movie);
  }

    return (
      <div
        className="movie-card-carousel movie-poster"
        onClick={setCurrentMovieACB}
      >
        <NavLink to={`/details/${props.movie.id}`}>
          <img
            className="movie-image-carousel"
            src={`${IMAGE_URL}${props.movie.backdrop_path}`}
          />
          <div className="poster poster-about">
            <p>{props.movie.overview}</p>
          </div>
          <div className="poster poster-info">
            <h3>{props.movie.title}</h3>
            <p>{Number(props.movie.release_date.split("-")[0])}</p>
          </div>
        </NavLink>
      </div>
    );
}
