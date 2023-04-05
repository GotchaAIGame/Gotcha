/* eslint-disable */
import React, { useState, useEffect, useRef, RefObject } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addProblem } from "@stores/game/gameSlice";
import GameCard from "./GameCard";
import plusButton from "@assets/purpleplusButton.svg";
// import UploadTest from "./UploadTest";

export default function GameCardCarousel() {
  const [gameCardRefArray, setGameCardRefArray] = useState<
    Array<Array<React.Ref<HTMLInputElement>>>
  >([
    [React.createRef<HTMLInputElement>(), React.createRef<HTMLInputElement>()],
  ]);

  const addProblemHandler = () => {
    const refObj1 = React.createRef<HTMLInputElement>();
    if (refObj1.current) {
      refObj1.current.value = "xyxy";
    }
    const refObj2 = React.createRef<HTMLInputElement>();
    if (refObj2.current) {
      refObj2.current.value = "xyxy";
    }
    console.log(refObj1);
    setGameCardRefArray([...gameCardRefArray, [refObj1, refObj2]]);
  };

  const deleteProblemHandler = (idx: number) => {
    const newGameCardRefArray = [...gameCardRefArray].filter(
      (array, index: number) => {
        return index !== idx;
      }
    );
    pooCleaner(newGameCardRefArray);
    setGameCardRefArray([...newGameCardRefArray]);
  };

  const pooCleaner = (param: Array<any>) => {
    const sibal = [...param];
    sibal.forEach((refElement, idx) => {
      const sibal1 = refElement[0] as React.RefObject<HTMLInputElement>;
      console.log(sibal1.current?.value, "name", idx);
      const sibal2 = refElement[1] as React.RefObject<HTMLInputElement>;
      console.log(sibal2.current?.value, "hint", idx);
    });
  };

  useEffect(() => {
    console.log("바뀌었다.");
    pooCleaner(gameCardRefArray);
  }, [gameCardRefArray]);

  return (
    <div>
      <div className="problem-text-title-wrapper">
        <h5>문제 입력</h5>
        <div className="right-text-wrapper">
          <p>등록된 문제 {gameCardRefArray.length}개 </p>
          <p className="problem-create-waring-text">
            ※ 문제는 게임 생성 이후 수정이 불가합니다.
          </p>
        </div>
      </div>
      <div className="cards-and-plusbutton-container">
        {gameCardRefArray &&
          gameCardRefArray.map((data: any, index: number) => {
            const cardNameRef = data[0];
            const cardHintRef = data[1];

            return (
              <div key={`${index}`}>
                <GameCard
                  idx={index}
                  problemLength={gameCardRefArray.length}
                  cardNameRef={cardNameRef}
                  cardHintRef={cardHintRef}
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
