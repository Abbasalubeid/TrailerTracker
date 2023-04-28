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

    function mountACB(){
      discoverMovies().then((movies) => {
        setMovies(props.model.validMovies(movies))
        setFiltered(props.model.validMovies(movies))
      });
    }
  
    function setCurrentMovieACB(movie){
        props.model.setCurrentMovie(movie);
      }

    function updateFilteredMoviesACB(){
      if (activeGenre === 0){
        setFiltered(movies)
      }
      else {
      const filteredMovies = props.model.filteredMovies(activeGenre, movies)
      setFiltered(filteredMovies)
      }
    }

    function handleSearchACB(input){
      if (!input.trim()) {
        mountACB();
        return;
      }
      getMovieByName(input).then((movies) => {
        setMovies(props.model.validMovies(movies))
        setFiltered(props.model.validMovies(movies))
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
          setActiveFilter={setActiveGenre}
          activeFilter={activeGenre}
          filters={props.model.genres}/>
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