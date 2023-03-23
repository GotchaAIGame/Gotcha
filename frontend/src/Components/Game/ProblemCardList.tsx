import React, { useRef, useEffect } from "react";
import Hammer from "hammerjs";
import ProblemCard from "./ProblemCard";
import temporaryData from "./temporarydata";

function ProblemCardList() {
  const xOffset = useRef<number>(0);
  const cardList = useRef<HTMLDivElement>(null);

  // temporary data
  const problems = temporaryData;

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
    <div className="problem-carousel">
      <div className="carousel-inner-container" ref={cardList}>
        {problems.map((item, idx) => {
          return <ProblemCard problem={item} key={item.problemId} />;
        })}
      </div>
    </div>
  );
}

export default ProblemCardList;
