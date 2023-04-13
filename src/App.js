import './styles/App.css';
import HomepagePresenter from './presenter/homepagePresenter';
import { Routes, Route,Navigate } from "react-router-dom";
import React from 'react';
import Sidebar from './view/sidebar';

function App() {

  const [navVisible, showNavbar] = React.useState(false);


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
    </Routes>
  </div>
  );
}

export default App;
