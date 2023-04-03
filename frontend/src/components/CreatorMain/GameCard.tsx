import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";

export default function GameCard(props: any) {
  const { gameInfo } = props;

  const navigate = useNavigate();

  const goDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log(e);
    navigate(`/custom/${gameInfo.code}`, {
      state: { gamePin: gameInfo.code, roomId: gameInfo.id },
    });
  };

  const goEdit = () => {
    navigate(`/edit/${gameInfo.code}`, {
      state: { roomId: gameInfo.id },
    });
  };

  const goRanking = () => {
    console.log("ranking보기로 갈 것입니다");
    navigate(`/game/${gameInfo.code}/rank`);
  };

  const alertNoRank = () => {
    alert("시작 전인 게임입니다.");
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
    const today = new Date();
    const start = new Date(gameInfo.startTime);
    const end = new Date(gameInfo.endTime);

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
              <div className="card-content-desc-text-wrapper">
                <p className="card-content-desc-text">{gameInfo.eventDesc}</p>
              </div>
            </div>
          </article>
        </button>
        <footer>
          <Button
            text="수정하기"
            size="small"
            color="gray-lime"
            onClick={goEdit}
          />
          {start > today && end > today ? (
            <Button
              text="랭킹보기"
              size="small"
              color="gray"
              onClick={alertNoRank}
            />
          ) : (
            <Button
              text="랭킹보기"
              size="small"
              color="skyblue"
              onClick={goRanking}
            />
          )}
        </footer>
      </div>
    );
  }
  return null;
}
