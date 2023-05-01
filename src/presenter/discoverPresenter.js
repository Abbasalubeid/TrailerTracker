import React from "react";
import {motion, AnimatePresence} from "framer-motion"
import {discoverMovies, getMovieByName} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import SearchBar from "../view/searchBar.js"
import Filter from "../view/filter.js";
import "../styles/movieCard.css"
import Loading from "../view/loading.js";

export default function DiscoverPresenter(props){
    const [movies, setMovies] = React.useState([]);
    const [filtered, setFiltered] = React.useState([]);
    const [activeGenre, setActiveGenre] = React.useState(0);
    const [isLoading, setIsLoading] = React.useState(true); 
    const [error, setError] = React.useState(null); 

    function mountACB(){
      document.documentElement.scrollTop = 0;
      setIsLoading(true);  
      discoverMovies().then((movies) => {
        const validMovies = props.model.validMovies(movies);
        setMovies(validMovies);
        setFiltered(validMovies);
        setIsLoading(false); 
      }).catch(() => {
        setError(new Error("We're having trouble fetching the movies. Please try again later."));   
        setIsLoading(false);  
      });
    }
  
    function setCurrentMovieACB(movie){
        props.model.setCurrentMovie(movie);
      }

      function updateFilteredMoviesACB() {
        if (activeGenre === 0) {
          setFiltered(movies);
          setError(null);
        } else {
          const filteredMovies = props.model.filteredMovies(activeGenre, movies);
          if (filteredMovies.length === 0) {
            setError(new Error(`No results found in this genre. Please try another one`));
            setFiltered([]);
          } else {
            setFiltered(filteredMovies);
            setError(null);
          }
        }
      }
      

    function handleSearchACB(input){
      setError(null);
      if (!input.trim()) {
          mountACB();
          return;
      }
      getMovieByName(input).then((movies) => {
          const validMovies = props.model.validMovies(movies);
          if (validMovies.length === 0){
            setError(new Error(`No results found for "${input}". Please check your spelling or try using different keywords.`));
          }
          else{
            setMovies(validMovies);
            setFiltered(validMovies);
            setIsLoading(false);
          }
      }).catch(() => {
        setError(new Error(`No results found for "${input}". Please check your spelling or try using different keywords.`));
          setIsLoading(false);
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
      userSearched={handleSearchACB}
      hasError={error} />
      <Filter 
      setActiveFilter={setActiveGenre}
      activeFilter={activeGenre}
      filters={props.model.genres}/>
      <Loading error={error}>
        {!isLoading && (
          <>
            <motion.div layout={true}
            className="movie-card">
            <AnimatePresence>
              {filtered &&
                filtered.map(renderMoviesCB)}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </Loading>
      </>
    );
}