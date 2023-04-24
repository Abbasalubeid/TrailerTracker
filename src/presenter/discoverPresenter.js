import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import SearchView from "../view/searchView.js"
import "../styles/movieCard.css"
import Filter from "../view/filter.js";

export default function DiscoverPresenter(props){
    const [movies, setMovies] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [activeGenre, setActiveGenre] = React.useState(0);

    const genres = [
      { id: 28, name: "Action" },
      { id: 878, name: "Science fiction" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
      { id: 10752, name: "War" },
      { id: 16, name: "Animation" },
      { id: 18, name: "Drama" },
      { id: 27, name: "Horror" },
  ];

    function mountACB(){
      discoverMovies().then((movies) => {
          setMovies(movies);
          setFiltered(movies);
      });
  }
  
    function setCurrentMovieACB(movie){
        props.setCurrentMovie(movie);
      }

    function renderFilteredMoviesACB(){
      const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(activeGenre));
      setFiltered(filteredMovies)
    }

    React.useEffect(mountACB, []);
    React.useEffect(renderFilteredMoviesACB, [activeGenre]);

    return (
        <>
          <SearchView />
          <Filter 
          setActiveGenre={setActiveGenre}
          activeGenre={activeGenre}
          genres={genres}/>
          <div className="movie-card">
            {filtered &&
              filtered.map((movie) => (
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