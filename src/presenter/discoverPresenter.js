import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import SearchView from "../view/searchView.js"
import "../styles/movieCard.css"
import Filter from "../view/filter.js";

export default function DiscoverPresenter(props){
    const [movies, setMovies] = React.useState([]);
    const [activeGenre, setActiveGenre] = React.useState(0);

    function mountACB(){
      discoverMovies().then((movies) => {
          setMovies(movies);
      });
  }
  
  console.log(activeGenre);
    function setCurrentMovieACB(movie){
        props.setCurrentMovie(movie);
      }

    React.useEffect(mountACB, []);

    return (
        <>
          <SearchView />
          <Filter 
          allMovies={movies}
          activeGenre={activeGenre}
          setActiveGenre={setActiveGenre}/>
          <div className="movie-card">
            {movies &&
              movies.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  onMovieChoice={setCurrentMovieACB}
                />
              ))}
          </div>
        </>
      );
}