import React, { useImperativeHandle, forwardRef } from "react";
import SearchBar from "../view/searchBar";
import { getMovieByName } from "../model/fetchSource.js";

function SearchBarPresenter(props, ref) {
  const [inputError, setInputError] = React.useState(false);
  const [searchInput, setSearchInput] = React.useState("");

  function onUserSearched(input){
    setSearchInput(input)
  }

  function handleSearchACB() {

    if (searchInput.trim() === "") {
      props.setActiveSearch(false);
      return;
    }
    props.setActiveSearch(true);

    const loadingTimeout = setTimeout(() => {
      props.setIsLoading(true);
    }, 30);

    getMovieByName(searchInput)
      .then((movies) => {
        let validMovies = props.model.validMovies(movies);
        validMovies = props.model.sortedMovies(validMovies, props.activeSortingFilter);
        if (validMovies.length === 0) {
          props.setError(
            new Error(
              `No results found for "${searchInput}". Please check your spelling or try using different keywords.`
            )
          );
          setInputError(true)
          props.setIsLoading(false);
          clearTimeout(loadingTimeout);
        } else {
            console.log("err");
          props.setSearchedMovies(validMovies);
          setInputError(false)
          props.setError(null);
          props.setIsLoading(false);
          clearTimeout(loadingTimeout);
        }
      })
      .catch(() => {
        clearTimeout(loadingTimeout);
        props.setError(
          new Error(
            `No results found for "${searchInput}". Please check your spelling or try using different keywords.`
          )
        );
        setInputError(true)
        props.setIsLoading(false);
      });
  }

  useImperativeHandle(ref, function () {
    return {
      search: handleSearchACB,
    };
  });

  React.useEffect(handleSearchACB, [searchInput]);

  return <SearchBar userSearched={onUserSearched} hasError={inputError} />;
}

export default forwardRef(SearchBarPresenter);
