import React from "react";
import {discoverMovies} from "../model/fetchSource.js"
import MovieCardView from "../view/movieCardView.js";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function MovieCardPresenter(){
    const [popularMovies, setPopularMovies] = React.useState([]);

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1700 },
            items: 10
          },
          LargerDesktop: {
            breakpoint: { max: 1700, min: 1300},
            items: 8
          },
        LargeDesktop: {
          breakpoint: { max: 1300, min: 750},
          items: 5
        },
        desktop: {
          breakpoint: { max: 850, min: 600 },
          items: 3
        },
        tablet: {
          breakpoint: { max: 600, min: 380 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 380, min: 0 },
          items: 1
        }
      };

    function mountACB(){
        discoverMovies().then((movies) => setPopularMovies(movies));
    }

    React.useEffect(mountACB, []);

    return (
        <Carousel 
        responsive={responsive} 
        showDots={true}
        keyBoardControl={true}
        >
          {popularMovies &&
            popularMovies.map((movie) => (
              <MovieCardView
                key = {movie.id}
                movie = {movie}
              />
            ))}
        </Carousel>
      );
}