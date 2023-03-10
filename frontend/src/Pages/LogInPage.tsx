import React from "react";
import { Link } from "react-router-dom";
import LogIn from "../Components/Users/LogIn";
import "../Styles/LogInPage.scss";
import banner from "../assets/TopBanner.svg";
import logo from "../assets/Gotcha.png";

export default function LogInPage() {
  return (
    <div className="login-page-container">
      <div className="top-banner">
        <img src={banner} alt="" />
      </div>
      <Link to="/">
        <img src={logo} alt="" className="login-banner" />
      </Link>
      <LogIn />
    </div>
  );
}
