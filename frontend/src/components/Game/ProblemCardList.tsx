import React, { useRef, useEffect, useCallback, useState } from "react";
import { useAppSelector } from "@stores/storeHooks";
import ProblemCard from "./ProblemCard";
import Scroller from "./Scroller";

function ProblemCardList() {
  const { themeColor } = useAppSelector((state) => state.theme);
  const { solved, problems } = useAppSelector((state) => state.gamePlay);
  const cardList = useRef<HTMLDivElement>(null);
  // temporary data
  const [locs, setLocs] = useState([1]);

  useEffect(() => {
    if (cardList.current && cardList.current.childNodes) {
      const templocs = Array.from(cardList.current.childNodes).map((node) => {
        return (node as HTMLElement).offsetTop as number;
      });

      setLocs(templocs);
    }
  }, []);

  // when button is clicked
  const buttonHandler = useCallback(
    (direction: "left" | "right") => {
      let div = 1;
      if (cardList.current && cardList.current.parentElement) {
        const offset = cardList.current.offsetWidth;

        if (cardList.current?.childElementCount > 0) {
          div = cardList.current.childElementCount;
        }

        if (direction === "left") {
          cardList.current.parentElement.scrollBy({
            left: -offset / div,
            behavior: "smooth",
          });
        } else {
          cardList.current.parentElement.scrollBy({
            left: offset / div,
            behavior: "smooth",
          });
        }
      }
    },
    [cardList.current?.offsetWidth]
  );

  return (
    <>
      <Scroller
        data={problems.map((problem) => {
          return problem.problemName;
        })}
        locs={locs}
      />
      <div className="problem-carousel-wrapper">
        <div className="problem-carousel">
          <div className="carousel-inner-container" ref={cardList}>
            {problems.map((item, idx) => {
              return (
                <ProblemCard
                  problem={item}
                  key={`${item.problemId}`}
                  index={`${item.problemId}`}
                  solved={solved[idx]?.solved || false}
                />
              );
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
            <h1 style={{ color: `${themeColor}` }}>◀</h1>
          </button>
          <button
            type="button"
            className="problem-button right"
            onClick={() => {
              buttonHandler("right");
            }}
          >
            <h1 style={{ color: `${themeColor}` }}>▶</h1>
          </button>
        </div>
      </div>
    </>
  );
}

export default ProblemCardList;
