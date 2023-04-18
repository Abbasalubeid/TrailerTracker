import './styles/App.css';
import HomepagePresenter from './presenter/homepagePresenter';
import DiscoverPresenter from './presenter/discoverPresenter';
import MovieDetails from './view/movieDetails';
import { Routes, Route,Navigate } from "react-router-dom";
import React from 'react';
import Sidebar from './view/sidebar';


function App() {
  const [navVisible, showNavbar] = React.useState(false);
  const [currentMovie, setCurrentMovie] = React.useState({})



  return (
    <div>
    <Sidebar visible={ navVisible } show={ showNavbar } />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <HomepagePresenter>  
          </HomepagePresenter>
        </div>
      } />
      <Route path='/discover' element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <DiscoverPresenter>
          </DiscoverPresenter>
        </div>
      } />
      <Route path={`/details`} element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
        <MovieDetails>
        </MovieDetails>      
        </div>
      } />
    </Routes>
  </div>
  );
}

export default App;
