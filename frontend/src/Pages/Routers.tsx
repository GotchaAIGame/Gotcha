import React from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "./MainPage";

export default function Routers() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}
