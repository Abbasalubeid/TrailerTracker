import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import '../styles/sidebar.css';
import { FaHome, FaCompass, FaBars, FaTimes } from 'react-icons/fa';

export default function Sidebar(props) {
  const ICON_SIZE = 20;
  const location = useLocation();

  return (
    <>
      <div className="nav-top">
        <button className="nav-btn" onClick={() => props.show(!props.visible)}>
          {props.visible ? <FaTimes size={24} /> : <FaBars size={24} />}
        </button>
      </div>

      <nav className={!props.visible ? 'sidebar' : ''}>
        <div>
          <NavLink
            to="/home"
            className={location.pathname === "/home" ? "nav-link active-nav" : "nav-link"}
          >
            <FaHome
              size={20}
            />
            <span >
              Home
            </span>
          </NavLink>
          <NavLink
            to="/discover"
            className={location.pathname === "/discover" ? "nav-link active-nav" : "nav-link"}
          >
            <FaCompass
              size={ICON_SIZE}
            />
            <span>
              Discover
            </span>
          </NavLink>
        </div>
      </nav>
    </>
  );
}
