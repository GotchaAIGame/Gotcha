import React from "react";
import { useSelector } from "react-redux";
import "./styles/CustomNavbar.scss";

export default function CustomNavbar() {
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);
  const themeTitle = useSelector((state: any) => state.theme.themeTitle);

  const bgColor = {
    backgroundColor: themeColor,
  };

  return (
    <header className="custom-nav-container" style={bgColor}>
      <img src={themeLogo} alt="로고" />
      <h3 className="custom-title-wrapper">{themeTitle}</h3>
    </header>
  );
}
