import React from "react";

export default function GameCard() {
  return (
    <div className="card-wrapper">
      <header>
        <input type="text" placeholder="문제이름" />
      </header>
      <div className="file-input-wrapper">
        <input type="file" accept="image/*" />
      </div>
      <div className="hint-text-box">힌트</div>
      <div className="hint-input-wrapper">
        <input type="text" placeholder="힌트를 추가해 주세요" />
      </div>
    </div>
  );
}
