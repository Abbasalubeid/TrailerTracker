import MovieCard from "../view/movieCard.js";
import MoviePoster from "../view/moviePoster.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/movieCarousel.css"

export default function MovieCarousel(props) {
    const MovieComponent = props.poster ?  MoviePoster : MovieCard;
  return (
    <>
    <h1 className="title">{props.title}</h1>
    <Carousel 
      responsive={props.responsiveConfig} 
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