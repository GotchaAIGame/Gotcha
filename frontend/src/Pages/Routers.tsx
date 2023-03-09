import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";
import CreateGamePage from "./CreateGamePage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/create/game" element={<CreateGamePage />} />
    </Routes>
  );
}
