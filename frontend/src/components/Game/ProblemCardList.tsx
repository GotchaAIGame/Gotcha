import React, { useRef, useEffect, useCallback, useState } from "react";
import Hammer from "hammerjs";
import ProblemCard from "./ProblemCard";
import temporaryData from "./temporarydata";

function ProblemCardList() {
  const cardList = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number>(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isDesktop = windowWidth >= 900;

  // temporary data
  const problems = temporaryData;

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

  // swipe
  // useEffect(() => {
  //   const manager = new Hammer.Manager(cardList.current as HTMLElement);
  //   // manager.add(new Hammer.Swipe());
  //   manager.on("swipe", function (e) {
  //     console.log("하하");
  //     const { deltaX } = e;

  //     if (cardList.current && cardList.current.parentElement) {
  //       cardList.current.parentElement.scrollBy({
  //         left: -deltaX,
  //         behavior: "smooth",
  //       });
  //     }
  //   });
  // }, []);

  return (
    <div className="problem-carousel-wrapper">
      <div className="problem-carousel">
        <div className="carousel-inner-container" ref={cardList}>
          {problems.map((item, idx) => {
            return <ProblemCard problem={item} key={item.problemId} />;
          })}
        </div>
      </div>
      {isDesktop && (
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
      )}
    </div>
  );
}

export default ProblemCardList;
