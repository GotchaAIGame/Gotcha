import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";

export default function GameCard(props: any) {
  const { gameInfo } = props;

  const navigate = useNavigate();

  const goDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e);
    navigate(`/game/detail/${gameInfo.code}`, {
      state: { gameId: gameInfo.id },
    });
  };

  // 날짜 파싱
  function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const yearStr = date.getFullYear().toString().substr(2, 2);
    const monthStr = (date.getMonth() + 1).toString().padStart(2, "0");
    const dayStr = date.getDate().toString().padStart(2, "0");
    const hourStr = date.getHours().toString().padStart(2, "0");
    const minuteStr = date.getMinutes().toString().padStart(2, "0");

    return `${yearStr}.${monthStr}.${dayStr} ${hourStr}:${minuteStr}`;
  }

  if (gameInfo) {
    // console.log(gameInfo);

    const startDateInfo = formatDate(gameInfo.startTime);
    const endDateInfo = formatDate(gameInfo.endTime);

    return (
      <div className="card-wrapper">
        <button type="button" className="detail-move-button" onClick={goDetail}>
          <header>
            <h5>{gameInfo.title}</h5>
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
                <p>시작 {startDateInfo}</p>
                <p>종료 {endDateInfo}</p>
              </div>
            </div>
            <div className="card-content-wrapper">
              <div className="card-content-title-wrapper">문제</div>
              <p>{gameInfo.problemCount}개</p>
            </div>
            <div className="card-content-wrapper">
              <div className="card-content-title-wrapper">설명</div>
              <p className="card-content-desc-text">{gameInfo.eventDesc}</p>
            </div>
          </article>
        </button>
        <footer>
          <Button text="조기종료" size="small" color="gray" />
          <Button text="랭킹보기" size="small" color="gray" />
        </footer>
      </div>
    );
  }
  return null;
}
