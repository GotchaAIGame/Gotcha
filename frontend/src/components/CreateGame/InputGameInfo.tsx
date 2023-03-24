import React from "react";
import { Grid, Container } from "@mui/material";

export default function InputGameInfo() {
  return (
    <div className="input-game-info-container">
      {/* 타이틀 입력 */}
      <input
        className="game-title-input"
        type="text"
        placeholder="문제 제목을 입력해 주세요"
      />

      {/* 기간, 정보  */}
      <div className="game-info-inputs-container">
        {/* 진행 기간 */}
        <div className="duration-inputs-container">
          <h5>진행 기간</h5>
          <div className="right-inputs-container">
            <input type="datetime-local" />
            <p>~</p>
            <input type="datetime-local" />
          </div>
        </div>

        {/* 퀴즈 정보 */}
        <div className="game-inputs-container">
          <h5>게임 정보</h5>
          <div className="right-inputs-container">
            <textarea placeholder="게임의 정보를 입력해 주세요. 정렬 안 맞아도 울지 않아요" />
          </div>
        </div>
      </div>
    </div>
  );
}
