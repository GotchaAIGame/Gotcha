/* eslint-disable */
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProblem } from "@stores/game/gameSlice";
import GameCard from "./GameCard";
// import UploadTest from "./UploadTest";

export default function GameCardCarousel() {
  const gameInfo = useSelector((state: any) => state.game);
  const problemsInfo = gameInfo.problems;

  const dispatch = useDispatch();

  const addProblemHandler = () => {
    console.log(gameInfo.problems);
    dispatch(addProblem());
  };

  return (
    <div className="cards-and-plusbutton-container">
      {problemsInfo.length &&
        problemsInfo.map((data: any, index: number) => (
          <div key={index}>
            {/* <p>{index}</p> */}
            <GameCard index={index} />
          </div>
        ))}
      {/* <GameCard /> */}
      {/* <UploadTest /> */}

      <button
        type="button"
        onClick={addProblemHandler}
        className="add-img-button"
      >
        +
      </button>
    </div>
  );
}
