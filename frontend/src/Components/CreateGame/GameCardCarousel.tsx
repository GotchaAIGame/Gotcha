import React, { useState } from "react";
import GameCard from "./GameCard";

export default function GameCardCarousel() {
  const [problemCount, setProblemCount] = useState<number>(1);

  const problemCountArr = Array.from({ length: problemCount }, (_, i) => i);

  const problemCountHandler = () => {
    setProblemCount(problemCount + 1);
  };

  return (
    <div>
      {problemCountArr.map((index) => (
        <GameCard key={index} />
      ))}
      <button
        type="button"
        onClick={problemCountHandler}
        className="add-img-button"
      >
        +
      </button>
    </div>
  );
}
