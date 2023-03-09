import React from "react";
import { Link } from "react-router-dom";
import { Grid, Container } from "@mui/material";
import InputPinNum from "../Components/MainPage/InputPinNum";
import "../Styles/MainPage.scss";

export default function MainPage() {
  return (
    // 그리드 테스트 용입니다.
    <div>
      <h3>Main</h3>
      <InputPinNum />

      {/* 임시 바로가기 모음 */}
      <div className="temps-container">
        <p>🚀 임시 바로가기 모음 🚀</p>
        <Link to="/creator">
          <button type="button">출제자 메인 페이지</button>
        </Link>
        <Link to="/create/game">
          <button type="button">문제 출제하기</button>
        </Link>
      </div>
    </div>
  );
}
