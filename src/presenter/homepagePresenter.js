import React from "react";
import {topRatedMovies, trendingMovies, upcomingMovies} from "../model/fetchSource.js"
import MovieCarousel from "../view/movieCarousel.js"
import Loading from "../view/loading.js";

export default function HomepagePresenter(props){
  const [topRated, setTopRated] = React.useState({data: [], error: null});
  const [trendMovies, setTrendMovies] = React.useState({data: [], error: null});
  const [upcomMovies, setupcomMovies] = React.useState({data: [], error: null});  
  const [error, setError] = React.useState(null);
  const [allFail, setAllFail] = React.useState(null);

    const numberOfCards = {
      desktop1: { breakpoint: { max: 4000, min: 1700 }, items: 9 },
      desktop2: { breakpoint: { max: 1700, min: 1300 }, items: 7 },
      desktop3: { breakpoint: { max: 1300, min: 1080 }, items: 6 },
      tablet1: { breakpoint: { max: 1080, min: 805 }, items: 5 },
      tablet2: { breakpoint: { max: 805, min: 660 }, items: 4 },
      tablet3: { breakpoint: { max: 660, min: 510 }, items: 3 },
      mobile1: { breakpoint: { max: 380, min: 0 }, items: 2 },
      mobile2: { breakpoint: { max: 310, min: 0 }, items: 1 }
    };
  
    const numberOfPosters = {
      desktop1: { breakpoint: { max: 4000, min: 1750 }, items: 4},
      desktop2: { breakpoint: { max: 1750, min: 1550 }, items: 3, partialVisibilityGutter: 70 },
      desktop3: { breakpoint: { max: 1550, min: 1470 }, items: 3, partialVisibilityGutter: 40},
      desktop4: { breakpoint: { max: 1470, min: 1350 }, items: 3},
      tablet1: { breakpoint: { max: 1350, min: 1200 }, items: 2, partialVisibilityGutter: 150},
      tablet2: { breakpoint: { max: 1200, min: 1030 }, items: 2, partialVisibilityGutter: 65},
      tablet3: { breakpoint: { max: 1030, min: 910 }, items: 2}, 
      tablet4: { breakpoint: { max: 910, min: 788 }, items: 1, partialVisibilityGutter: 320 },
      tablet5: { breakpoint: { max: 788, min: 680 }, items: 1, partialVisibilityGutter: 200 },
      mobile1: { breakpoint: { max: 680, min: 510 }, items: 1, partialVisibilityGutter: 120 },
      mobile2: { breakpoint: { max: 510, min: 460 }, items: 1, partialVisibilityGutter: 70 },
      mobile3: { breakpoint: { max: 460, min: 420 }, items: 1, partialVisibilityGutter: 30 },
      mobile4: { breakpoint: { max: 420, min: 0 }, items: 1},
    };

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