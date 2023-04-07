/* eslint-disable */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import GameCard from "./GameCard";
// import UploadTest from "./UploadTest";

export default function GameCardCarousel() {
  const gameInfo = useSelector((state: any) => state.game);
  const problemsInfo = gameInfo.problems || [];

  const [isAddable, setIsAddable] = useState<boolean>(false);


  return (
    <div className="problem-cards-container">
      <div className="problem-text-title-wrapper">
        <h5>문제 입력</h5>
        <div className="right-text-wrapper">
          <p>등록된 문제 {problemsInfo.length}개 </p>
          <p className="problem-create-waring-text">
            ※ 생성된 문제는 수정할 수 없습니다. <br /> 문제 삭제만 가능하며,
            삭제 시 복구가 불가합니다.
          </p>
        </div>
      </div>
      <div className="cards-and-plusbutton-container">
        {problemsInfo.length &&
          problemsInfo.map((data: any, index: number) => (
            <div key={index}>
              <GameCard
                idx={index}
                isAddable={isAddable}
                setIsAddable={setIsAddable}
              />
            </div>
          ))}
      </div>
    </div>
  );
}
