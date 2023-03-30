import React from "react";
import { Route, Routes } from "react-router-dom";
import FakeMainPage from "./FakeMainPage";
import MainPage from "./MainPage";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import CreatorMainPage from "./CreatorMainPage";
import CreateGamePage from "./CreateGamePage";
import CustomGamePage from "./CustomGamePage";
import PlayerNewGamePage from "./PlayerNewGamePage";
import GamePage from "./GamePage";
import ModalTestPage from "./ModalTestPage";
import ModalTestPage2 from "./ModalTestPage2";
import PlayerRejoinPage from "./PlayerRejoinPage";
import RankPage from "./RankPage";
import ImageCropperPage from "./ImageCropperPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<FakeMainPage />} />
      <Route path="/main" element={<MainPage />} />
      {/* 추후 최종 배포시 아래로 Main 주소 변경 */}
      {/* <Route path="/" element={<MainPage />} /> */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/creator" element={<CreatorMainPage />} />
      <Route path="/create/game" element={<CreateGamePage />} />
      <Route path="/custom/game" element={<CustomGamePage />} />
      <Route path="/newgame/:roomId" element={<PlayerNewGamePage />} />
      <Route path="/rejoin/:roomId" element={<PlayerRejoinPage />} />
      <Route path="game">
        <Route path=":roomPin" element={<GamePage />} />
        <Route path=":roomPin/rank" element={<RankPage />} />
      </Route>
      <Route path="/modalTest" element={<ModalTestPage />} />
      <Route path="/modalTest/2" element={<ModalTestPage2 />} />
      <Route path="/crop" element={<ImageCropperPage />} />
    </Routes>
  );
}