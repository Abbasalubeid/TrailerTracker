import React from "react";
import {motion, AnimatePresence} from "framer-motion"
import {discoverMovies, getMovieByName} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import SearchBar from "../view/searchBar.js"
import Filter from "../view/filter.js";
import "../styles/movieCard.css"

export default function DiscoverPresenter(props){
    const [movies, setMovies] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [activeGenre, setActiveGenre] = React.useState(0);

    const genres = [
      { id: 0, name: "All" },
      { id: 28, name: "Action" },
      { id: 878, name: "Science fiction" },
      { id: 12, name: "Adventure" },
      { id: 14, name: "Fantasy" },
      { id: 16, name: "Animation" },
      { id: 18, name: "Drama" },
      { id: 27, name: "Horror" },
      { id: 10752, name: "War" }
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

    function updateFilteredMoviesACB(){
      if (activeGenre === 0){
        setFiltered(movies)
        return;
      }
      const filteredMovies = movies.filter((movie) => movie.genre_ids.includes(activeGenre));
      setFiltered(filteredMovies)
    }

    function handleSearchACB(input){
      if (!input.trim()) {
        mountACB();
        return;
      }
      getMovieByName(input).then((movies) => {
        setMovies(movies);
        setFiltered(movies);
    });
    }

    function renderMoviesCB(movie){
      return (
          movie ? 
          <MovieCard
              key={movie.id}
              movie={movie}
              onMovieChoice={setCurrentMovieACB}
          />
          : null
      );
  }
    
    React.useEffect(mountACB, []);
    React.useEffect(updateFilteredMoviesACB, [activeGenre]);

    return (
        <>
          <SearchBar
          userSearched={handleSearchACB} />
          <Filter 
          setActiveGenre={setActiveGenre}
          activeGenre={activeGenre}
          genres={genres}/>
          <motion.div layout={true}
          className="movie-card">
          <AnimatePresence>
            {filtered &&
              filtered.map(renderMoviesCB)}
            </AnimatePresence>
          </motion.div>
        </>
      );
}