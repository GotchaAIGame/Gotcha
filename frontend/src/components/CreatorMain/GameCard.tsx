import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@components/common/Button";
import { useDispatch } from "react-redux";
import { setTheme } from "@stores/player/themeSlice";

export default function GameCard(props: any) {
  const { gameInfo } = props;
  const [durationText, setDurationText] = useState<string>("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const goDetail = (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(e);
    // navigate(`/custom/${gameInfo.code}`, {
    //   state: { gamePin: gameInfo.code, roomId: gameInfo.id },
    // });
  };

  const goEdit = () => {
    navigate(`/edit/${gameInfo.code}`, {
      state: { gamePin: gameInfo.code, roomId: gameInfo.id },
    });
  };

  const goRanking = () => {
    dispatch(
      setTheme({
        room: gameInfo.id,
        reward: gameInfo.hasReward,
        themeColor: gameInfo.color,
        themeLogo: gameInfo.logoUrl,
        themeTitle: gameInfo.title,
      })
    );
    navigate(`/game/${gameInfo.code}/rank`, {
      state: { roomId: gameInfo.id, fromMypage: true },
    });
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

  useEffect(() => {
    if (gameInfo) {
      const today = new Date();
      const start = new Date(gameInfo.startTime);
      const end = new Date(gameInfo.endTime);

      if (start > today) {
        setDurationText("[시작 전]");
      }
      if (start <= today && end >= today) {
        setDurationText("[진행 중]");
      }
      if (end < today) {
        setDurationText("[종료]");
      }
    }
  }, []);

  if (gameInfo) {
    // console.log(gameInfo);

    const startDateInfo = formatDate(gameInfo.startTime);
    const endDateInfo = formatDate(gameInfo.endTime);
    const today = new Date();

    // dateChecker(start, end);

    return (
      <div className="creator-main-card-wrapper">
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
                {durationText && (
                  <p className="duration-text">{durationText}</p>
                )}
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
          {durationText === "[시작 전]" ? (
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
