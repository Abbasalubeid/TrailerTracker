import { IMAGE_URL } from "../model/apiConfig.js";
import { FaStar} from "react-icons/fa";
import "../styles/movieDetails.css"

export default function MovieDetails(props){


  return (
    <div className="movie-details">
      <img
        className={props.movie.poster_path ? "movie-detail-poster" : "hide"}
        src={`${IMAGE_URL}${props.movie.poster_path}`}
        alt={props.movie.title}
      />
      <div className="movie-detail-info">
        <h2 className="movie-detail-title">{props.movie.title}</h2>
        <p className="movie-detail-overview">{props.movie.overview}</p>
        <div className="movie-rating">
          <FaStar className="star-icon" />
          <p className="rating-value">{props.movie.vote_average?.toFixed(1)}</p>
        </div>
        <p className="release-date">
          Release Date: {new Date(props.movie.release_date).toLocaleDateString()}
        </p>
      </div>
    </div>    
  );
} 