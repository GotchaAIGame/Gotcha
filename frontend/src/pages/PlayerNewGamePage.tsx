import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import NewPlayerInfo from "@components/PlayerMain/NewPlayerInfo";
import "@styles/PlayerNewGamePage.scss";

export default function PlayerNewGamePage() {
  const location = useLocation();
  const themeColor = useSelector((state: any) => state.theme.themeColor);
  const themeLogo = useSelector((state: any) => state.theme.themeLogo);

  const tempHandler = () => {
    // dispatch(registerUser({ roomId: 2, nickname: "veomchan", password: 1234 }));
    // navigate(`/game/${location.state.inputPin}`, { state: { roomId: 2, authorized: true } });
    console.log("눌림");
  };

  return (
    <div
      className="player-info-container"
      style={{ backgroundColor: themeColor }}
    >
      <header>
        <Link to="/">
          <div className="logo-img">
            <img src={themeLogo} alt="로고" />
          </div>
        </Link>
      </header>
      <NewPlayerInfo
        roomPin={location.state.inputPin}
        roomId={location.state.room}
      />
      <button type="button" onClick={tempHandler}>
        실험
      </button>
    </div>
  );
}
