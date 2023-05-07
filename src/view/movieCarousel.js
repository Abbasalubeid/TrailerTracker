import React from "react";
import MovieCard from "../view/movieCard.js";
import MoviePoster from "../view/moviePoster.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import "../styles/movieCarousel.css"

 function MovieCarousel(props) {
  const [slideIndex, setSlideIndex] = React.useState(0);
  const [carouselKey, setCarouselKey] = React.useState(0);
    const MovieComponent = props.poster ?  MoviePoster : MovieCard;
    const numSkeletons = 10;

    React.useEffect(() => {
      // Reset slide index and carousel key when new movies are loaded
      setSlideIndex(0);
      setCarouselKey((prevKey) => prevKey + 1);
    }, [props.movies]);

    const movieItems = props.movies.length === 0
    ? Array.from({ length: numSkeletons }, (_, index) => (
        <MovieComponent
          key={index}
          movie={null}
          carousel={true}
          disableClick={true}
        />
      ))
    : props.movies.map((movie) => (
        <MovieComponent
          key={movie.id}
          movie={movie}
          carousel={true}
          onMovieChoice={props.onMovieChoice}
        />
      ));

  return (
    <>
    <h1 className="title">{props.title}</h1>
    <Carousel 
      responsive={props.numberOfItems} 
      keyBoardControl={true}
      partialVisible={true}
      itemClass="carousel-item"
      slide={slideIndex}
      key={carouselKey}
    >
      {movieItems}
    </Carousel>
    </>
  );
}
export default React.memo(MovieCarousel);
