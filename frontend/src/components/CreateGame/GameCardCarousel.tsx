/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProblem } from "@stores/game/gameSlice";
import GameCard from "./GameCard";
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
    console.log("바뀜")
    console.log(problemsInfo)
  }
  }, [problemsInfo] )

  return (
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
      {/* <GameCard /> */}
      {/* <UploadTest /> */}
      {isAddable && (
        <button
          type="button"
          onClick={addProblemHandler}
          className="add-img-button"
        >
          +
        </button>
      )}
    </div>
  );
}
