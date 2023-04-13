import React from 'react';
import { NavLink } from "react-router-dom";
import "../styles/sidebar.css";
import {
    FaHome,
    FaAngleRight,
	FaAngleLeft, 
} from 'react-icons/fa';

export default function Sidebar(props) {
const ICON_SIZE = 20;

	return (
    <>
      <nav className={!props.visible ? "sidebar" : ""}>
        <button
          type="button"
          className="nav-btn"
          onClick={() => props.show(!props.visible)}
        >
          {!props.visible ? (
            <FaAngleRight size={30} />
          ) : (
            <FaAngleLeft size={30} />
          )}
        </button>
          <div className="links nav-top">
            <NavLink to="/home" className="nav-link">
              <FaHome size={20} />
              <span>Home</span>
            </NavLink>
          </div>
      </nav>
    </>
  );
}