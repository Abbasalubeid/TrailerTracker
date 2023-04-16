import React from 'react';
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import {
    FaHome,
    FaCompass,
    FaBars 
} from 'react-icons/fa';

export default function Sidebar(props) {
  const ICON_SIZE = 20;

  return (
    <>
      <div className="nav-top">
        <button
          className="nav-btn"
          onClick={() => props.show(!props.visible)}
        >
          <FaBars size={24} />
        </button>
      </div>
      
      <nav className={!props.visible ? "sidebar" : ""}>
        <div>
          <NavLink to="/home" className="nav-link">
            <FaHome size={20} />
            <span>Home</span>
          </NavLink>
          <NavLink to="/discover" className="nav-link">
            <FaCompass size={ICON_SIZE} />
            <span>Discover</span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}