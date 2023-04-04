/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProblem } from "@stores/game/gameSlice";
import GameCard from "./GameCard";
import plusButton from "@assets/purpleplusButton.svg";
// import UploadTest from "./UploadTest";

export default function GameCardCarousel() {
  const gameInfo = useSelector((state: any) => state.game);
  const problemsInfo = gameInfo.problems;

  const [isAddable, setIsAddable] = useState<boolean>(false);

  const dispatch = useDispatch();

  const addProblemHandler = () => {
    console.log(gameInfo.problems);
    dispatch(addProblem());
  };

  useEffect(() => {
    return () => {
      console.log("바뀜");
      console.log(problemsInfo);
    };
  }, [problemsInfo]);

  return (
    <div>
      <div className="problem-text-title-wrapper">
        <h5>문제 입력</h5>
        <div className="right-text-wrapper">
          <p>등록된 문제 {problemsInfo.length}개 </p>
          <p className="problem-create-waring-text">
            ※ 문제는 게임 생성 이후 수정이 불가합니다.
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
        <button
          type="button"
          onClick={addProblemHandler}
          className="add-img-button"
        >
          <img src={plusButton} alt="" />
        </button>
      </div>
    </div>
  );
}
