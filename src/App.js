import './styles/App.css';
import HomepagePresenter from './presenter/homepagePresenter';
import DiscoverPresenter from './presenter/discoverPresenter';
import { Routes, Route,Navigate } from "react-router-dom";
import React from 'react';
import Sidebar from './view/sidebar';
import MovieModel from "./model/MovieModel.js"

function App() {
  const [navVisible, showNavbar] = React.useState(false);

  const model = new MovieModel();

  return (
    <div>
    <Sidebar visible={ navVisible } show={ showNavbar } />
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} />
      <Route path='/home' element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <HomepagePresenter
          model={model}>  
          </HomepagePresenter>
        </div>
      } />
      <Route path='/discover' element={
        <div className={!navVisible ? "page" : "page page-with-navbar"}>
          <DiscoverPresenter
          model={model}>
          </DiscoverPresenter>
        </div>
      } />
    </Routes>
  </div>
  );
}

export default App;
