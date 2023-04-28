import './styles/App.css';
import HomepagePresenter from './presenter/homepagePresenter';
import DiscoverPresenter from './presenter/discoverPresenter';
import DetailsPresenter from './presenter/detailsPresenter';
import { Routes, Route,Navigate } from "react-router-dom";
import React from 'react';
import Sidebar from './view/sidebar';


function App(props) {
  const [navVisible, showNavbar] = React.useState(false);

  return (
    <div>
      <Sidebar visible={navVisible} show={showNavbar} />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <HomepagePresenter model={props.model}></HomepagePresenter>
            </div>
          }
        />
        <Route
          path="/discover"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <DiscoverPresenter model={props.model}></DiscoverPresenter>
            </div>
          }
        />
        <Route
          path="/details/:id"
          element={
            <div className={!navVisible ? "page" : "page page-with-navbar"}>
              <DetailsPresenter model={props.model} />
            </div>
          }
        />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
      <footer>
        <p>
          This product uses the TMDb API but is not endorsed or certified by
          TMDb
        </p>
      </footer>
    </div>
  );
}

export default App;
