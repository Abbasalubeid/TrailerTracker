import React from 'react';
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo} from "../model/fetchSource.js"

export default function DetailsPresenter(props){
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);

    function mountACB(){
      getVideo(props.movie.id).then((movie) => {
        setCurrentMovieTrailers(movie);
      });
    }
  
    function renderTrailers() {
      const sortedTrailers = currentMovieTrailers.sort((a, b) => (
        // Using the official property of each trailer is not always consistent
        a.name.includes("Official Trailer") ? -1 :
        b.name.includes("Official Trailer") ? 1 :
        0
      ));

      console.log(sortedTrailers );
      return sortedTrailers.map(trailer => (
        <TrailerCard key={trailer.id} trailer={trailer} />
      ));
    }
        
    React.useEffect(mountACB, []);

    return (
      <>
        <MovieDetails movie={props.movie} />
        {currentMovieTrailers && renderTrailers()}
      </>
    );
}