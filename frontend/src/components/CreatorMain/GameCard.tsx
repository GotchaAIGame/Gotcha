import React from "react";
import Button from "@components/common/Button";

export default function GameCard(props: any) {
  const { gameInfo } = props;

  if (gameInfo) {
    return (
      <div className="card-wrapper">
        <header>
          <h5>Game 제목</h5>
        </header>
        <article>
          <div className="logo-image-wrapper">
            <div className="card-content-title-wrapper">로고</div>
            <img src={gameInfo.logoUrl} alt="" />
          </div>
          <div className="card-content-wrapper">
            <div className="card-content-title-wrapper">PIN</div>
            <p>{gameInfo.code}</p>
          </div>
          <div className="card-content-wrapper">
            <div className="card-content-title-wrapper">기간</div>
            <div className="card-aside-wrapper">
              <p>시작 {gameInfo.startTime}</p>
              <p>종료 {gameInfo.endTime}</p>
            </div>
          </div>
          <div className="card-content-wrapper">
            <div className="card-content-title-wrapper">설명</div>
            <p>{gameInfo.eventDesc}</p>
          </div>
        </article>
        <footer>
          <Button text="조기종료" size="small" color="gray" />
          <Button text="랭킹보기" size="small" color="gray" />
        </footer>
      </div>
    );
  }
  return null;
}
