import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/movieCard.css";

export default function MovieCardView(props) {
  return (
    <div className="movie-card">
      {props.movie ? (
        <img
          className="movie-image"
          src={`${IMAGE_URL}${props.movie.poster_path}`}
          alt={props.title}
        />
      ) : null}
      <div className="movie-info">
        <h3>{props.movie.title}</h3>
        <p>{props.movie.releaseDate}</p>
        <p>{props.movie.overview}</p>
      </div>
    </div>
  );
}
