import React from "react";
import { Route, Routes } from "react-router-dom";
import SocialLogin from "@components/Users/SocialLogin";
import MainPage from "./MainPage";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import CreatorMainPage from "./CreatorMainPage";
import EditProfilePage from "./EditProfilePage";
import CreateGamePage from "./CreateGamePage";
import CustomGamePage from "./CustomGamePage";
import CreatorGameDetailPage from "./CreatorGameDetailPage";
import PlayerNewGamePage from "./PlayerNewGamePage";
import GamePage from "./GamePage";
import ModalTestPage from "./ModalTestPage";
import ModalTestPage2 from "./ModalTestPage2";
import PlayerRejoinPage from "./PlayerRejoinPage";
import RankPage from "./RankPage";
import ImageCropperPage from "./ImageCropperPage";
import EditGamePage from "./EditGamePage";
import NotFoundPage from "./NotFoundPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />

      {/* Creator */}
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />
      <Route path="/socialLogin" element={<SocialLogin />} />
      <Route path="mypage">
        <Route path=":memberID" element={<CreatorMainPage />} />
        <Route path=":memberID/edit" element={<EditProfilePage />} />
      </Route>
      <Route path="/create/game" element={<CreateGamePage />} />
      <Route path="/custom/:gamepin" element={<CustomGamePage />} />
      <Route path="/game/detail/:gamepin" element={<CreatorGameDetailPage />} />
      <Route path="/edit/:gamepin" element={<EditGamePage />} />

      {/* Player */}
      <Route path="/newgame/:roomId" element={<PlayerNewGamePage />} />
      <Route path="/rejoin/:roomId" element={<PlayerRejoinPage />} />
      <Route path="game">
        <Route path=":roomPin" element={<GamePage />} />
        <Route path=":roomPin/rank" element={<RankPage />} />
      </Route>
      <Route path="/modalTest" element={<ModalTestPage />} />
      <Route path="/modalTest/2" element={<ModalTestPage2 />} />
      <Route path="/crop" element={<ImageCropperPage />} />

      {/* <Route path="/*" element={<NotFoundPage />} /> */}
    </Routes>
  );
}
