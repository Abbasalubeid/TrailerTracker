import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { discoverMovies} from "../model/fetchSource.js";
import MovieCard from "../view/movieCard.js";
import SearchBarPresenter from "./searchBarPresenter.js";
import Filter from "../view/filter.js";
import SortDropdown from "../view/sortDropdown.js";
import "../styles/movieCard.css";
import "../styles/discover.css";
import Loading from "../view/loading.js";
import { genres, sortingFilters } from "../model/constants.js"

export default function DiscoverPresenter(props) {
  const [movies, setMovies] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [activeGenre, setActiveGenre] = React.useState(0);
  const [activeSortingFilter, setActiveSortingFilter] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [pages, setPages] = React.useState({});
  const [activeSearch, setActiveSearch] = React.useState(false);
  const searchBarPresenterRef = React.useRef(null);
  
  function discoverACB(page = 1, activeGenre = 0, sortBy = "", shouldReset = false) {
    let timerId = setTimeout(() => setIsLoading(true), 20);

    discoverMovies(page, activeGenre, sortBy)
      .then((newMovies) => handleDiscoverRequest(newMovies, shouldReset))
      .catch(() => {
        clearTimeout(timerId);
        setError(
          new Error(
            "We're having trouble fetching the movies. Please ensure you're connected to the internet and try again."
          )
        );
      })
      .finally(() => {
        clearTimeout(timerId);
        setIsLoading(false);
      });
  }
  
  function handleDiscoverRequest(newMovies, shouldReset) {
    const validMovies = props.model.validMovies(newMovies);
  
    let moviesMap;
    let filteredMap;
  
    if (shouldReset) {
      moviesMap = new Map();
      filteredMap = new Map();
    } else {
      moviesMap = new Map(movies.map((movie) => [movie.id, movie]));
      filteredMap = new Map(filtered.map((movie) => [movie.id, movie]));
    }
  
    validMovies.forEach((movie) => {
      moviesMap.set(movie.id, movie);
    });
  
    validMovies.forEach((movie) => {
      filteredMap.set(movie.id, movie);
    });
  
    setMovies(Array.from(moviesMap.values()));
    setFiltered(Array.from(filteredMap.values()));
  
    setPages((prevPages) => (
      {
      ...prevPages,
      [activeGenre]: (prevPages[activeGenre] || 1) + 1,
    }));
    setIsLoading(false);
  }

  function setCurrentMovieACB(movie) {
    props.model.setCurrentMovie(movie);
  }

  function updateFilteredMoviesACB() {
    if (error && error.message.includes("spelling")) {
      return;
    }
    const sourceMovies = searchedMovies?.length > 0 ? searchedMovies : movies;
  
    if (sourceMovies.length === 0) {
      return;
    }
  
    const filteredMovies = props.model.filterMovies(sourceMovies, activeGenre);
  
    if (filteredMovies.length === 0) {
      if(!activeSearch){
        discoverACB(1, activeGenre, activeSortingFilter, true);
        return;
      }
      const errorMessage = `No results found${activeGenre > 0 ? ' in this genre' : ''}`;
      setError(new Error(errorMessage));
    } else {
      setFiltered(filteredMovies);
      setError(null);
    }
  }

  function triggerSearch() {
    if (activeSearch) {
      searchBarPresenterRef.current.search();
    } else {
      discoverACB(1, activeGenre, activeSortingFilter, true);
    }
  }

  function sortHasChangedACB() {
    setPages((prevPages) => ({
      ...prevPages,
      [activeGenre]: 1,
    }));
  
    triggerSearch();
  }

  function handleActiveFilterChangeACB(newActiveFilter){
    setActiveGenre(newActiveFilter)
  
    if (activeSearch) {
      return;
    } else {
      setActiveSortingFilter("");
    }
  }

  function onActiveSearchACB(){
    if(activeSearch){
      return;
    }
    else{
      setActiveSortingFilter("")
    }
  }

  function renderMoviesCB(movie, index) {
    return movie ? (
      <MovieCard
        key={`${movie.id}_${index}`}
        movie={movie}
        onMovieChoice={setCurrentMovieACB}
      />
    ) : null;
  }

  function nextPage() {
    if (!isLoading) {
      const currentPage = pages[activeGenre] || 1;
      discoverACB(currentPage, activeGenre, activeSortingFilter)
    }
  }

  React.useEffect(discoverACB, []);
  React.useEffect(updateFilteredMoviesACB, [activeGenre, searchedMovies, activeSortingFilter]);
  React.useEffect(sortHasChangedACB, [activeSortingFilter]);
  React.useEffect(onActiveSearchACB, [activeSearch]);

  return (
    <>
      <div className="search-container">
      <SearchBarPresenter
        model={props.model}
        ref={searchBarPresenterRef}
        setIsLoading={setIsLoading}
        setError={setError}
        setSearchedMovies={setSearchedMovies}
        setActiveSearch={setActiveSearch}
        activeSortingFilter={activeSortingFilter}
      />

      <SortDropdown
        setActiveSortingFilter={setActiveSortingFilter}
        activeRatingFilter={activeSortingFilter}
        ratingFilters={sortingFilters}
      />
      </div>
      <Filter
        setActiveFilter={handleActiveFilterChangeACB}
        activeFilter={activeGenre}
        filters={genres}
      />
      <Loading loading={isLoading} error={error}>
        <>
          <motion.div layout={true} className="movie-card">
            <AnimatePresence>
              {filtered && filtered.map(renderMoviesCB)}
            </AnimatePresence>
          </motion.div>
          {filtered && (
            <div className={activeSearch ? "hide" : "load-more-container"}>
            <p className="load-more-text" onClick={nextPage}>
              Load More
            </p>
          </div>          
          )}
        </>
      </Loading>
    </>
  );
}
