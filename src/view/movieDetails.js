import { IMAGE_URL } from "../model/apiConfig.js";

export default function MovieDetails(props){

    return (
      <div className="movie-details">
        <h1>{console.log(props.movie)}</h1>
      </div>
    );
}