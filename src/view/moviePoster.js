import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/moviePoster.css";

export default function MoviePoster(props) {

    const test = "/9n2tJBplPbgR2ca05hS5CKXwP2c.jpg"

    return (
        <div className="movie-poster">
            <img
              className=""
              src={`${IMAGE_URL}${test}`}
              alt={props.title}
            />
        </div>
      );
}
