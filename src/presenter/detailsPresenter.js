import React from 'react';
import { useParams } from "react-router-dom";
import MovieDetails from '../view/movieDetails.js';
import TrailerCard from '../view/trailerCard.js';
import {getVideo, getMovieDetails, getRecommendations, getCredits} from "../model/fetchSource.js"
import MovieCarousel from '../view/movieCarousel.js';
import Loading from "../view/loading.js";

export default function DetailsPresenter(props){
    const { id } = useParams();
    const [currentMovie, setCurrentMovie] = React.useState(props.model.currentMovie);
    const [currentMovieTrailers, setCurrentMovieTrailers] = React.useState([]);
    const [failedTrailers, setFailedTrailers] = React.useState([]);
    const [recommendations, setRecommendations] = React.useState([]);
    const [castMembers, setCastMembers] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    const [loadKey, setLoadKey] = React.useState(Date.now());


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
      document.documentElement.scrollTop = 0;
      if (!(currentMovie.id == id)) {
        Promise.all([getMovieDetails(id), getVideo(id), getRecommendations(id), getCredits(id)])
          .then(([movieDetails, trailers, rec, credits]) => {
            setCurrentMovie(movieDetails);
            setCurrentMovieTrailers(trailers);
            setRecommendations(props.model.validMovies(rec));
            setCastMembers(credits.cast);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      } else {
        Promise.all([getVideo(currentMovie.id), getRecommendations(currentMovie.id), getCredits(currentMovie.id)])
          .then(([trailers, rec, credits]) => {
            setCurrentMovieTrailers(trailers);
            setRecommendations(props.model.validMovies(rec));
            setCastMembers(credits.cast);
            setIsLoading(false);
          })
          .catch((error) => {
            setError(error);
            setIsLoading(false);
          });
      }
    }
    
    function renderTrailers() {
     const sortedTrailers = props.model.chooseTrailers(currentMovieTrailers)
    
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

    function setCurrentMovieACB(movie) {
      setIsLoading(true);
      props.model.setCurrentMovie(movie);
      setCurrentMovie(movie);
      setLoadKey(Date.now());
    }

    React.useEffect(mountACB, [id]);

    return (
      <Loading key={loadKey} error={error}>
      {!isLoading && (
      <>
        <MovieDetails 
        movie={currentMovie}
        cast={castMembers} />
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
      )}
  </Loading>
    );
}