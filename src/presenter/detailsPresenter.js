import React from 'react';
import { useParams } from "react-router-dom";
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo, getMovieDetails} from "../model/fetchSource.js"

export default function DetailsPresenter(){
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = React.useState({});
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);
    const [failedTrailers, setFailedTrailers] = React.useState([]);
  
    function mountACB() {
      getMovieDetails(id).then((movie) => {
        setCurrentMovie(movie);
        getVideo(movie.id).then((trailers) => {
          setCurrentMovieTrailers(trailers);
        });
      });
    }
  
    function renderTrailers() {
      const officialTrailers = currentMovieTrailers.filter(trailer => (
        // Using the official property of each trailer is not always consistent
        trailer.name.toLowerCase().includes("official trailer") ||
        trailer.name.toLowerCase().includes("original trailer")
      ));
      let sortedTrailers = officialTrailers.slice(0, 2);

      if (sortedTrailers.length === 0) {
        sortedTrailers = currentMovieTrailers.slice(0, 2);
      }
    
      return sortedTrailers.map(trailer => {
        if (failedTrailers.includes(trailer.id)) {
          return null;
        }
        return (
          <TrailerCard key={trailer.id} trailer={trailer} 
          onVideoError={handleVideoErrorACB} />
        )
      });
    }

    function handleVideoErrorACB(trailerId) {
      setFailedTrailers([...failedTrailers, trailerId]);
    }
        
    React.useEffect(mountACB, []);

    return (
      <>
        <MovieDetails movie={currentMovie} />
        {currentMovieTrailers && renderTrailers()}
      </>
    );
}