import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/moviePoster.css";

export default function MoviePoster(props) {

  function setCurrentMovieACB(){
    props.onMovieChoice(props.movie);
  }

    return (
        <div className="movie-card-carousel movie-poster" onClick={setCurrentMovieACB}>
            <img
              className="movie-image-carousel"
              src={`${IMAGE_URL}${props.movie.backdrop_path}`}
              alt={props.movie.title}
            />
        <div className="poster poster-about">
        <p>{props.movie.overview}</p>
      </div>
        <div className="poster poster-info">
        <h3>{props.movie.title}</h3>
        <p>{Number(props.movie.release_date.split("-")[0])}</p>
      </div>
    </div>
      );
}
