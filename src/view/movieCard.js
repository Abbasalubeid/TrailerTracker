import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/movieCard.css";

export default function MovieCard(props) {
  return (
    <div className={props.carousel ? "movie-card-carousel" : "movie-card"}>
      {props.movie ? (
        <img
          className={props.carousel ? "movie-image-carousel" : "movie-image"}
          src={`${IMAGE_URL}${props.movie.poster_path}`}
          alt={props.title}
        />
      ) : null}
      <div className="movie-info">
        <h3>{props.movie.title}</h3>
        <p>{Number(props.movie.release_date.split("-")[0])}</p>
      </div>
    </div>
  );
}
