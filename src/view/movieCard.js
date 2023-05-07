import React from "react";
import { motion } from "framer-motion";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/movieCard.css";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

export default function MovieCard(props) {
  const [fixedLoading, setFixedLoading] = React.useState(true);

  React.useEffect(() => {
    if (props.carousel) {
      setFixedLoading(true);

      const timer = setTimeout(() => {
        setFixedLoading(false);
      }, 1200);

      return () => clearTimeout(timer); // Clean up the timer when the component unmounts
    } else {
      setFixedLoading(false);
    }
  }, []);

  function setCurrentMovieACB(){
    props.onMovieChoice(props.movie);
  }

  return (
    <motion.div 
    layout={true}
    animate={{ opacity: 1}}
    initial={{ opacity: 0}} 
    exit={{ opacity: 0}}  
    className={props.carousel ? "movie-card-carousel" : "movie-image-container"}
    onClick={props.disableClick ? null : setCurrentMovieACB}>
      {!props.movie || fixedLoading ? (
          <div className="skeleton-card">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
              <Skeleton height={200} duration={2} />
          </SkeletonTheme>
      </div>) : (
          <NavLink to={`/details/${props.movie.id}`}>
            <img
              className={props.carousel ? "movie-image-carousel" : "movie-image"}
              src={`${IMAGE_URL}${props.movie.poster_path}`}
              alt={props.movie.title}
            />
            <div className="movie-info">
              <h3>{props.movie.title}</h3>
              <p>{Number(props.movie.release_date.split("-")[0])}</p>
            </div>
          </NavLink>
        
      )}
    </motion.div>
  );
}
