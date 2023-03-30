import React from "react";
import { useAppDispatch } from "@stores/storeHooks";
import { Link, useNavigate } from "react-router-dom";
import NewPlayerInfo from "@components/PlayerMain/NewPlayerInfo";
import logo from "@assets/logo.svg";
import "@styles/PlayerNewGamePage.scss";
import { getProblemList, registerUser } from "@stores/game/gamePlaySlice";

export default function PlayerNewGamePage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const tempHandler = () => {
    dispatch(getProblemList({ roomId: 2, nickname: "veomchan" }));
    navigate("/game", { state: { roomId: 2, authorized: true } });
  };
  const tempHandler2 = () => {
    dispatch(registerUser({ roomId: 2, nickname: "veomchan", password: 1234 }));
  };

  return (
    <div className="player-info-container">
      <header>
        <Link to="/">
          <img className="logo-img" src={logo} alt="로고" />
        </Link>
      </header>
      <NewPlayerInfo />
      <button type="button" onClick={tempHandler}>
        실험
      </button>
      <button type="button" onClick={tempHandler2}>
        실험 2
      </button>
    </div>
  );
}
