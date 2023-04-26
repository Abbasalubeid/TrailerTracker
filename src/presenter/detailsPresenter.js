import React from 'react';
import { useParams } from "react-router-dom";
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo, getMovieDetails, getRecommendations} from "../model/fetchSource.js"
import MovieCarousel from '../view/movieCarousel.js';

export default function DetailsPresenter(props){
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = React.useState({});
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);
    const [failedTrailers, setFailedTrailers] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);

    const responsiveCards = {
      desktop1: { breakpoint: { max: 4000, min: 1700 }, items: 9 },
      desktop2: { breakpoint: { max: 1700, min: 1300 }, items: 7 },
      desktop3: { breakpoint: { max: 1300, min: 1080 }, items: 6 },
      tablet1: { breakpoint: { max: 1080, min: 805 }, items: 5 },
      tablet2: { breakpoint: { max: 805, min: 660 }, items: 4 },
      tablet3: { breakpoint: { max: 660, min: 510 }, items: 3 },
      mobile1: { breakpoint: { max: 380, min: 0 }, items: 2 },
      mobile2: { breakpoint: { max: 310, min: 0 }, items: 1 }
    };
  
    function mountACB() {
      getMovieDetails(id).then((movie) => {
        setCurrentMovie(movie);
        getVideo(movie.id).then((trailers) => {
          setCurrentMovieTrailers(trailers);
        });
        getRecommendations(id).then((rec) => {
          setRecommendations(rec);
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

    function setCurrentMovieACB(movie){
      props.setCurrentMovie(movie);
    }
        
    React.useEffect(mountACB, []);

    return (
      <>
        <MovieDetails movie={currentMovie} />
        {currentMovieTrailers && renderTrailers()}
        {recommendations.length > 0 && (
          <MovieCarousel
          title={"Recommendations"}
          responsiveConfig={responsiveCards}
          movies={recommendations}
          onMovieChoice = {setCurrentMovieACB}
          />

        
        )}
      </>
    );
}