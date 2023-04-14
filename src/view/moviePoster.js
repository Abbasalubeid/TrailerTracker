import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/moviePoster.css";

export default function MoviePoster(props) {

    const poster = "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg"
    const title = "The Super Mario Bros. Movie"
    const date = "2023-04-05"

    return (
        <div className="movie-card movie-poster">
            <img
              className="movie-image"
              src={`${IMAGE_URL}${poster}`}
              alt={props.title}
            />
        <div className="poster-info">
        <h3>{title}</h3>
        <p>{Number(date.split("-")[0])}</p>
      </div>
    </div>
      );
}
