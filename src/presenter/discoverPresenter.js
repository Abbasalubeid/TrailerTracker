import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { discoverMovies, getMovieByName } from "../model/fetchSource.js";
import MovieCard from "../view/movieCard.js";
import SearchBar from "../view/searchBar.js";
import Filter from "../view/filter.js";
import "../styles/movieCard.css";
import "../styles/discover.css";
import Loading from "../view/loading.js";

export default function DiscoverPresenter(props) {
  const [movies, setMovies] = React.useState([]);
  const [filtered, setFiltered] = React.useState([]);
  const [searchedMovies, setSearchedMovies] = React.useState([]);
  const [activeGenre, setActiveGenre] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [pages, setPages] = React.useState({});
  

  function fetchACB(page = 1, activeGenre = 0) {
    let timerId = setTimeout(() => setIsLoading(true), 80);

    discoverMovies(page, activeGenre)
    .then((newMovies) => {
      const validMovies = props.model.validMovies(newMovies);

      let moviesMap = new Map(movies.map(movie => [movie.id, movie]));

      validMovies.forEach(movie => {
        moviesMap.set(movie.id, movie);
      });

      let filteredMap = new Map(filtered.map(movie => [movie.id, movie]));
      validMovies.forEach(movie => {
        filteredMap.set(movie.id, movie);
      });

      setMovies(Array.from(moviesMap.values()));
      setFiltered(Array.from(filteredMap.values()));

      setPages((prevPages) => ({
        ...prevPages,
        [activeGenre]: (prevPages[activeGenre] || 1) + 1,
      }));
      clearTimeout(timerId);
      setIsLoading(false);
    })
      .catch(() => {
        clearTimeout(timerId); 
        setError(
          new Error(
            "We're having trouble fetching the movies. Please ensure you're connected to the internet and try again."
          )
        );
      });
  }

  function setCurrentMovieACB(movie) {
    props.model.setCurrentMovie(movie);
  }

  function updateFilteredMoviesACB() {
    if (error && !error.message.toString().includes("genre")) return;

    const sourceMovies = searchedMovies?.length > 0 ? searchedMovies : movies;

    if (activeGenre === 0) {
      setFiltered(sourceMovies);
      setError(null);
    } else {
      const filteredMovies = props.model.filteredMovies(
        activeGenre,
        sourceMovies
      );
      if (filteredMovies.length === 0) {
        setError(
          new Error(`No results found in this genre. Please try another one`)
        );
        setFiltered([]);
      } else {
        setFiltered(filteredMovies);
        setError(null);
      }
    }
  }

  function handleSearchACB(input) {
    if (input.trim() === "") {
      setError(null);
      setSearchedMovies(null);
      return;
    }

    const loadingTimeout = setTimeout(() => {
      setIsLoading(true);
    }, 30);
    getMovieByName(input)
      .then((movies) => {
        const validMovies = props.model.validMovies(movies);
        if (validMovies.length === 0) {
          setError(
            new Error(
              `No results found for "${input}". Please check your spelling or try using different keywords.`
            )
          );
          setIsLoading(false);
          clearTimeout(loadingTimeout);
        } else {
          setSearchedMovies(validMovies);
          setError(null);
          setIsLoading(false);
          clearTimeout(loadingTimeout);
        }
      })
      .catch(() => {
        clearTimeout(loadingTimeout);
        setError(
          new Error(
            `No results found for "${input}". Please check your spelling or try using different keywords.`
          )
        );
        setIsLoading(false);
      });
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
      fetchACB(currentPage, activeGenre)
    }
  }

  React.useEffect(fetchACB, []);
  React.useEffect(updateFilteredMoviesACB, [activeGenre, searchedMovies]);

  return (
    <>
      <SearchBar userSearched={handleSearchACB} hasError={error} />
      <Filter
        setActiveFilter={setActiveGenre}
        activeFilter={activeGenre}
        filters={props.model.genres}
      />
      <Loading loading={isLoading} error={error}>
        <>
          <motion.div layout={true} className="movie-card">
            <AnimatePresence>
              {filtered && filtered.map(renderMoviesCB)}
            </AnimatePresence>
          </motion.div>
          {filtered && (
            <div className="load-more-container">
            <p className="load-more-text" onClick={nextPage} disabled={isLoading}>
              Load More
            </p>
          </div>          
          )}
        </>
      </Loading>
    </>
  );
}
