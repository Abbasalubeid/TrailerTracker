import React from "react";
import {discoverMovies, trendingMovies} from "../model/fetchSource.js"
import MovieCard from "../view/movieCard.js";
import MoviePoster from "../view/moviePoster.js";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function HomepagePresenter(){
    const [popularMovies, setPopularMovies] = React.useState([]);
    const [trendMovies, setTrendMovies] = React.useState([]);

    const responsiveCards = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1700 },
            items: 6
          },
        LargerDesktop: {
            breakpoint: { max: 1700, min: 1300},
            items: 5
          },
        desktop: {
          breakpoint: { max: 1300, min: 1080},
          items: 4
        },
        largerTablet: {
          breakpoint: { max: 1080, min: 800 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 800, min: 350 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 350, min: 0 },
          items: 1
        }
      };

      const responsivePosters = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1700 },
            items: 4
          },
        LargerDesktop: {
            breakpoint: { max: 1700, min: 950},
            items: 3
          },
        tablet: {
            breakpoint: { max: 950, min: 630},
            items: 2
          },
        mobile: {
          breakpoint: { max: 630, min: 0 },
          items: 1
        },
      };

    function mountACB(){
        discoverMovies().then((movies) => setPopularMovies(movies));
        trendingMovies().then((movies) => setTrendMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
        <div>
          <Carousel 
        responsive = {responsivePosters} 
        showDots = {true}
        keyBoardControl = {true}
        >
          {trendMovies &&
            trendMovies.map((movie) => (
              <MoviePoster
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
          <Carousel 
        responsive={responsiveCards} 
        showDots={true}
        keyBoardControl={true}
        >
          {popularMovies &&
            popularMovies.map((movie) => (
              <MovieCard
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
        </div>

      );
}