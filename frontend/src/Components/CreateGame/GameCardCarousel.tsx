import React, { useState } from "react";
import GameCard from "./GameCard";
import UploadTest from "./UploadTest";

export default function GameCardCarousel() {
  const [problemCount, setProblemCount] = useState<number>(1);

  const problemCountArr = Array.from({ length: problemCount }, (_, i) => i);

  const problemCountHandler = () => {
    setProblemCount(problemCount + 1);
  };

  return (
    <div>
      <UploadTest />
      {problemCountArr.map((index) => (
        <div key={index}>
          <p>{index}</p>
          <GameCard key={index} />
        </div>
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
