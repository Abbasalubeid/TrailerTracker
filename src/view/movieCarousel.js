import React from "react";
import MovieCard from "../view/movieCard.js";
import MoviePoster from "../view/moviePoster.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/movieCarousel.css"

 function MovieCarousel(props) {
    const MovieComponent = props.poster ?  MoviePoster : MovieCard;
  return (
    <>
    <h1 className="title">{props.title}</h1>
    <Carousel 
      responsive={props.numberOfItems} 
      keyBoardControl={true}
      partialVisible={true}
      itemClass="carousel-item"
    >
      {props.movies &&
        props.movies.map((movie) => (
          <MovieComponent
            key={movie.id}
            movie={movie}
            carousel={true}
            onMovieChoice = {props.onMovieChoice}
          />
        ))}
    </Carousel>
    </>
  );
}
export default React.memo(MovieCarousel);
