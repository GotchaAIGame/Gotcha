import React from "react";
import { Link } from "react-router-dom";
import "./styles/Hamburgerbar.scss";

export default function Hambugerbar() {
  const menuOnClick = () => {
    const menuBar = document.getElementById("menu-bar");
    const nav = document.getElementById("nav");
    const menuBg = document.getElementById("menu-bg");
    if (menuBar && nav && menuBg) {
      menuBar.classList.toggle("change");
      nav.classList.toggle("change");
      menuBg.classList.toggle("change-bg");
    }
  };

  return (
    <div>
      <div id="menu">
        <button
          id="menu-bar"
          className="menu-bar"
          type="button"
          onClick={menuOnClick}
          aria-label="Toggle Menu"
          aria-expanded="false"
        >
          <div id="bar1" className="bar" />
          <div id="bar2" className="bar" />
          <div id="bar3" className="bar" />
        </button>
        <nav className="nav" id="nav">
          <ul>
            <li>
              <Link to="/main">Home</Link>
            </li>
            <li>
              <Link to="/mypage">My Page</Link>
            </li>
            <li>
              <Link to="/mypage">Login</Link>
            </li>
            <li>
              <Link to="/mypage">Logout</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div id="menu-bg" className="menu-bg" />
    </div>
  );
}
