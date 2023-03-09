import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/GotchaLogo.svg";

export default function Navbar() {
  return (
    <header className="app-main-header">
      <Link to="/">
        <img src={logo} alt="logo" style={{ marginTop: "40px" }} />
      </Link>
    </header>
  );
}
