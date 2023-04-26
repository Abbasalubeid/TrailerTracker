import './styles/App.css';
import HomepagePresenter from './presenter/homepagePresenter';
import DiscoverPresenter from './presenter/discoverPresenter';
import DetailsPresenter from './presenter/detailsPresenter';
import { Routes, Route,Navigate } from "react-router-dom";
import React from 'react';
import Sidebar from './view/sidebar';


function App() {
  const [navVisible, showNavbar] = React.useState(false);
  const [currentMovie, setCurrentMovie] = React.useState({})

  function movieHasChangedACB(movie) {
    setCurrentMovie(movie)
  }

  return (
    <div>
    <Sidebar visible={ navVisible } show={ showNavbar } />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <HomepagePresenter
          setCurrentMovie={movieHasChangedACB}>  
          </HomepagePresenter>
        </div>
      } />
      <Route path='/discover' element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <DiscoverPresenter
          setCurrentMovie={movieHasChangedACB}>
          </DiscoverPresenter>
        </div>
      } />
      <Route path="/details/:id" element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
        <DetailsPresenter
        setCurrentMovie={movieHasChangedACB}/>      
        </div>
      } />
    </Routes>
  </div>
  );
}

export default App;
