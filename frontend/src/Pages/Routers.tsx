import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import SignUpPage from "./SignUpPage";
import LogInPage from "./LogInPage";
import CreatorMainPage from "./CreatorMainPage";
import CreateGamePage from "./CreateGamePage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/login" element={<LogInPage />} />

      <Route path="/creator" element={<CreatorMainPage />} />
      <Route path="/create/game" element={<CreateGamePage />} />
    </Routes>
  );
}
