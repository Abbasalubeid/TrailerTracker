import React from "react";
import {topRatedMovies, trendingMovies} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import MoviePoster from "../view/moviePoster.js";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function HomepagePresenter(){
    const [popularMovies, setPopularMovies] = React.useState([]);
    const [trendMovies, setTrendMovies] = React.useState([]);

    const responsiveCards = {
      superLargeDesktop: { breakpoint: { max: 4000, min: 1700 }, items: 9 },
      LargerDesktop: { breakpoint: { max: 1700, min: 1300 }, items: 7 },
      desktop: { breakpoint: { max: 1300, min: 1080 }, items: 6 },
      largerTablet: { breakpoint: { max: 1080, min: 805 }, items: 5 },
      tablet2: { breakpoint: { max: 805, min: 660 }, items: 4 },
      tablet1: { breakpoint: { max: 660, min: 510 }, items: 3 },
      mobile2: { breakpoint: { max: 380, min: 0 }, items: 2 },
      mobile1: { breakpoint: { max: 310, min: 0 }, items: 1 },
    };
  
    const responsivePosters = {
      superLargeDesktop: { breakpoint: { max: 4000, min: 1700 }, items: 4 },
      LargerDesktop: { breakpoint: { max: 1700, min: 950 }, items: 3 },
      tablet: { breakpoint: { max: 950, min: 630 }, items: 2 },
      mobile: { breakpoint: { max: 630, min: 0 }, items: 1 },
    };

    function mountACB(){
        topRatedMovies().then((movies) => setPopularMovies(movies));
        trendingMovies().then((movies) => setTrendMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
        <>
          <h1 className="title">Trending</h1>
          <Carousel 
        responsive = {responsivePosters} 
        keyBoardControl = {true}
        itemClass="carousel-item-padding-40-px"
        >
          {trendMovies &&
            trendMovies.map((movie) => (
              <MoviePoster
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
        <h1 className="title">Top rated</h1>    
        <Carousel 
        responsive={responsiveCards} 
        keyBoardControl={true}
        itemClass="carousel-item-padding-40-px"
        >
          {popularMovies &&
            popularMovies.map((movie) => (
              <MovieCard
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
        </>

      );
}