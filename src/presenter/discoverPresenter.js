import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";

export default function DiscoverPresenter(){
    const [movies, setMovies] = React.useState([]);

    function mountACB(){
        discoverMovies().then((movies) => setMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
      <>
        {movies &&
            movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </>
    );
}