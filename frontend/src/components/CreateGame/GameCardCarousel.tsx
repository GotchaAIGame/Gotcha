/* eslint-disable */
import React, { useState, useEffect, useRef, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProblem } from "@stores/game/gameSlice";
import GameCard from "./GameCard";
import plusButton from "@assets/purpleplusButton.svg";
// import UploadTest from "./UploadTest";

interface problemInfo {
  id : number
  name : React.RefObject<HTMLInputElement>
  hint : React.RefObject<HTMLInputElement>
  image : React.RefObject<HTMLInputElement>
}

export default function GameCardCarousel() {
  const [gameCardRefArray, setGameCardRefArray] = useState<
    Array<problemInfo>
  >([
    {id : 0, name : React.createRef<HTMLInputElement>(), hint : React.createRef<HTMLInputElement>(), image : React.createRef<HTMLInputElement>()},
  ]);

  let tempProbId = useRef<number>(0)
  const addProblemHandler = () => {
    const refObj1 = React.createRef<HTMLInputElement>();
    const refObj2 = React.createRef<HTMLInputElement>();
    const refObj3 = React.createRef<HTMLInputElement>();

    tempProbId.current += 1
    setGameCardRefArray([...gameCardRefArray, {id : tempProbId.current, name : refObj1, hint : refObj2, image : refObj3}]);
  };

  // const deleteProblemHandler = (idx: number) => {
  //   const newGameCardRefArray = [...gameCardRefArray].filter(
  //     (array, index: number) => {
  //       return index !== idx;
  //     }
  //   );
  //   setGameCardRefArray([...newGameCardRefArray]);
  // };

  const deleteProblemHandler = (idx : number) => {
    if (gameCardRefArray.length > 1){
    const newGameCardRefArray = [...gameCardRefArray].filter((value) => {
      return value.id !== idx
    })
    setGameCardRefArray(newGameCardRefArray)
  }
  }

  return (
    <div>
      <div className="problem-text-title-wrapper">
        <h5>문제 입력</h5>
        <div className="right-text-wrapper">
          <p>등록된 문제 {gameCardRefArray.length}개 </p>
        </div>
      </div>
      <div className="cards-and-plusbutton-container">
        {gameCardRefArray &&
          gameCardRefArray.map((data: any, index: number) => {
            const probIndex = data.id
            const cardNameRef = data.name;
            const cardHintRef = data.hint;
            const cardImageRef = data.image

            return (
              <div key={probIndex}>
                <GameCard
                  idx={probIndex}
                  cardNameRef={cardNameRef}
                  cardHintRef={cardHintRef}
                  cardImageRef={cardImageRef}
                  deleteHandler={deleteProblemHandler}
                />
              </div>
            );
          })}
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
