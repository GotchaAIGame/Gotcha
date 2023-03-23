import React, { useRef, useEffect, useCallback } from "react";
import Hammer from "hammerjs";
import ProblemCard from "./ProblemCard";
import temporaryData from "./temporarydata";

function ProblemCardList() {
  const xOffset = useRef<number>(0);
  const cardList = useRef<HTMLDivElement>(null);

  // temporary data
  const problems = temporaryData;

  // when button is clicked
  const buttonHandler = useCallback(
    (direction: "left" | "right") => {
      if (cardList.current && cardList.current.parentElement) {
        const offset = cardList.current.offsetWidth;

        if (direction === "left") {
          cardList.current.parentElement.scrollBy({
            left: -offset,
            behavior: "smooth",
          });
        } else {
          cardList.current.parentElement.scrollBy({
            left: offset,
            behavior: "smooth",
          });
        }
      }
    },
    [cardList.current?.offsetWidth]
  );

  // swipe
  useEffect(() => {
    const manager = new Hammer.Manager(cardList.current as HTMLElement);
    manager.add(new Hammer.Swipe());
    manager.on("swipe", function (e) {
      const { deltaX } = e;

      if (cardList.current && cardList.current.parentElement) {
        cardList.current.parentElement.scrollBy({
          left: -deltaX,
          behavior: "smooth",
        });
      }
    });
  }, []);

  return (
    <div className="problem-carousel-wrapper">
      <div className="problem-carousel">
        <div className="carousel-inner-container" ref={cardList}>
          {problems.map((item, idx) => {
            return <ProblemCard problem={item} key={item.problemId} />;
          })}
        </div>
      </div>
      <div className="problem-button-container">
        <button
          type="button"
          className="problem-button left"
          onClick={() => {
            buttonHandler("left");
          }}
        >
          <h1>◀</h1>
        </button>
        <button
          type="button"
          className="problem-button right"
          onClick={() => {
            buttonHandler("right");
          }}
        >
          <h1>▶</h1>
        </button>
      </div>
    </div>
  );
}

export default ProblemCardList;
