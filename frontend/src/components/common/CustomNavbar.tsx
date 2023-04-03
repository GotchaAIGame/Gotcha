import React from "react";
import { useSelector } from "react-redux";
import "./styles/CustomNavbar.scss";
import { Link } from "react-router-dom";
import helpBtn from "@assets/helpButton.svg";

export default function CustomNavbar() {
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);
  const themeTitle = useSelector((state: any) => state.theme.themeTitle);

  const bgColor = {
    backgroundColor: themeColor,
  };

  return (
    <header className="custom-nav-container" style={bgColor}>
      <Link to="/">
        <img src={themeLogo} alt="로고" />
      </Link>
      <div className="title-button-container">
        <h3 className="custom-title-wrapper">{themeTitle}</h3>
        <button type="button" className="game-detail-button">
          <img src={helpBtn} className="game-detail-button-img" alt="zz" />
        </button>
      </div>
    </header>
  );
}
