import React from "react";
import { motion } from "framer-motion";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/movieCard.css";
import { NavLink } from "react-router-dom";


export default function MovieCard(props) {

  function setCurrentMovieACB(){
    props.onMovieChoice(props.movie);
  }

  return (
    <motion.div 
    layout={true}
    animate={{ opacity: 1}}
    initial={{ opacity: 0}} 
    exit={{ opacity: 0}}  
    className={props.carousel ? "movie-card-carousel" : ""}>
      {props.movie ? (
        <div className="movie-image-container" onClick={setCurrentMovieACB}>
        <NavLink to={`/details/${props.movie.id}`}>
            <img
              className={props.carousel ? "movie-image-carousel" : "movie-image"}
              src={`${IMAGE_URL}${props.movie.poster_path}`}
              alt={props.title}
            />
            <div className="movie-info">
              <h3>{props.movie.title}</h3>
              <p>{Number(props.movie.release_date.split("-")[0])}</p>
            </div>
        </NavLink>
        </div>
      ) : null}
    </motion.div>
  );
}
