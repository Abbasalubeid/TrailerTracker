import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCardView from "../view/movieCardView.js";

export default function MovieCardPresenter(){
    const [popularMovies, setPopularMovies] = React.useState([]);


    function mountACB(){
        discoverMovies().then((movies) => setPopularMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
        <div className="movie-card-container">
          {popularMovies &&
            popularMovies.map((movie) => (
              <MovieCardView
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </div>
      );
}