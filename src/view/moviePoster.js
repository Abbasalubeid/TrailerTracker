import React from "react";
import { IMAGE_URL } from "../model/apiConfig.js";
import "../styles/moviePoster.css";
import { NavLink } from "react-router-dom";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


export default function MoviePoster(props) {
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
      <div
        className="movie-card-carousel movie-poster"
        onClick={props.disableClick ? null : setCurrentMovieACB}
      >
      {!props.movie || fixedLoading ? (
        <div className="skeleton-card">
          <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <Skeleton height={200} duration={2} />
          </SkeletonTheme>
        </div>
      ) : (
        <NavLink to={`/details/${props.movie.id}`}>
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
        </NavLink>
      )}
    </div>
  );
}
