import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/moviePoster.css";

export default function MoviePoster(props) {

    return (
        <div className="movie-card-carousel movie-poster">
            <img
              className="movie-image-carousel"
              src={`${IMAGE_URL}${props.movie.backdrop_path}`}
              alt={props.movie.title}
            />
        <div className="poster-info">
        <h3>{props.movie.title}</h3>
        <p>{Number(props.movie.release_date.split("-")[0])}</p>
      </div>
    </div>
      );
}
