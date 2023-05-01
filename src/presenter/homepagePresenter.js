import React from "react";
import {topRatedMovies, trendingMovies, upcomingMovies} from "../model/fetchSource.js"
import MovieCarousel from "../view/movieCarousel.js"
import Loading from "../view/loading.js";
import {numberOfCards, numberOfPosters} from "../model/constants.js"

export default function HomepagePresenter(props){
  const [topRated, setTopRated] = React.useState({data: [], error: null});
  const [trendMovies, setTrendMovies] = React.useState({data: [], error: null});
  const [upcomMovies, setupcomMovies] = React.useState({data: [], error: null});  
  const [error, setError] = React.useState(null);
  const [allFail, setAllFail] = React.useState(null);

    async function fetchData(fetchFunction, setData) {
      return new Promise((resolve, reject) => {
        fetchFunction()
          .then(result => {
            setData({ data: result, error: null });
            setAllFail(false) // If any fetch is successful, set allFail to false
            resolve();
          })
          .catch(error => {
            setData({ data: [], error: error.message });
            resolve(); 
          });
      });
    }

    function mountACB(){
      let fetchesFailed = 0; // Keep track of number of failed fetches
      
      const fetchOperations = [
        fetchData(topRatedMovies, setTopRated),
        fetchData(trendingMovies, setTrendMovies),
        fetchData(upcomingMovies, setupcomMovies),
      ];
      
      fetchOperations.forEach(fetchOp => {
        fetchOp.catch(() => {
          fetchesFailed += 1;
          if (fetchesFailed === fetchOperations.length) { 
            setError(new Error("We're sorry, but we are unable to fetch the data at this moment. Please ensure you're connected to the internet and try again"));
          }
        });
      });
    }

    React.useEffect(mountACB, []);
    
  
    function setCurrentMovieACB(movie){
      props.model.setCurrentMovie(movie);
    }


    return (
      <Loading error={error}>
        {!allFail && (
          <>
            {!trendMovies.error && 
              <MovieCarousel 
                movies={trendMovies.data} 
                numberOfItems={numberOfPosters} 
                poster={true}
                title={"Trending"}
                onMovieChoice={setCurrentMovieACB}
              />
            }
            {!topRated.error && 
              <MovieCarousel 
                movies={topRated.data} 
                numberOfItems={numberOfCards}
                title={"Top rated"}
                onMovieChoice={setCurrentMovieACB}
              />
            }
            {!upcomMovies.error && 
              <MovieCarousel 
                movies={upcomMovies.data} 
                numberOfItems={numberOfCards} 
                title={"Upcoming"}
                onMovieChoice={setCurrentMovieACB}
              />
            }
          </>
        )}
      </Loading>
    );
}