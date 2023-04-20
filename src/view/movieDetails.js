import { IMAGE_URL } from "../model/apiConfig.js";
import { FaStar } from "react-icons/fa";
import "../styles/movieDetails.css"
export default function MovieDetails(props){

  const backgroundStyle = {
    backgroundImage: `url(${IMAGE_URL}${props.movie.backdrop_path})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  };

  return (
    <div className="movie-details" style={backgroundStyle}>
      <img
        className="movie-detail-poster"
        src={`${IMAGE_URL}${props.movie.poster_path}`}
        alt={props.movie.title}
      />
      <div className="movie-detail-info">
        <h2 className="movie-detail-title">{props.movie.title}</h2>
        <p className="movie-detail-overview">{props.movie.overview}</p>
        <div className="movie-rating">
          <FaStar className="star-icon" />
          <p className="rating-value">{props.movie.vote_average}</p>
        </div>
        <p className="release-date">
          Release Date: {new Date(props.movie.release_date).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
} 