import React, { useState, useRef, useEffect } from "react";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import Hammer from "hammerjs";
import ProblemCard from "./ProblemCard";

function ProblemCardList() {
  const [activeIndex, setActiveIndex] = useState(0);

  const updateIndex = (curIndex: number) => {
    let newIndex: number;

    if (curIndex < 0) {
      newIndex = 0;
    } else if (curIndex >= problems.length) {
      newIndex = problems.length - 1;
    } else {
      newIndex = curIndex;
    }

    setActiveIndex(newIndex);
  };

  // temporary data
  const problems = [
    {
      problemId: 1,
      problemName: "귀여운 월계 1",
      problemDesc: "귀여운 월계입니다.",
      problemImgURL:
        "https://user-images.githubusercontent.com/47023884/226226873-86a3c30d-3ed3-4cea-ab13-6e43dbddb0d2.png",
    },
    {
      problemId: 2,
      problemName: "귀여운 월계 2",
      problemDesc: "귀여운 월계 2입니다.",
      problemImgURL:
        "https://user-images.githubusercontent.com/47023884/226226873-86a3c30d-3ed3-4cea-ab13-6e43dbddb0d2.png",
    },
    {
      problemId: 3,
      problemName: "귀여운 월계 3",
      problemDesc: "귀여운 월계 3입니다.",
      problemImgURL:
        "https://user-images.githubusercontent.com/47023884/226226873-86a3c30d-3ed3-4cea-ab13-6e43dbddb0d2.png",
    },
    {
      problemId: 4,
      problemName: "귀여운 월계 4",
      problemDesc: "귀여운 월계 4입니다.",
      problemImgURL:
        "https://user-images.githubusercontent.com/47023884/226226873-86a3c30d-3ed3-4cea-ab13-6e43dbddb0d2.png",
    },
    {
      problemId: 5,
      problemName: "귀여운 월계 5",
      problemDesc: "귀여운 월계 5입니다.",
      problemImgURL:
        "https://user-images.githubusercontent.com/47023884/226226873-86a3c30d-3ed3-4cea-ab13-6e43dbddb0d2.png",
    },
    {
      problemId: 6,
      problemName: "귀여운 월계 6",
      problemDesc: "귀여운 월계 6입니다.",
      problemImgURL:
        "https://user-images.githubusercontent.com/47023884/226226873-86a3c30d-3ed3-4cea-ab13-6e43dbddb0d2.png",
    },
  ];

  return (
    <div className="problem-carousel">
      <div
        className="carousel-inner-container"
        style={{
          transform: `translateX(-${activeIndex * 296}px)`,
          // transform: "translate(-100%)",
          border: "1px",
        }}
      >
        {problems.map((item) => {
          return <ProblemCard problem={item} key={item.problemId} />;
        })}
      </div>
      <div className="button-container">
        <button
          className="button-arrow left"
          type="button"
          onClick={() => {
            updateIndex(activeIndex - 1);
            console.log(activeIndex);
          }}
        >
          <KeyboardArrowLeft />
        </button>
        <div className="indicators">{}</div>
        <button
          className="button-arrow right"
          type="button"
          onClick={() => {
            updateIndex(activeIndex + 1);
            console.log(activeIndex);
          }}
        >
          <KeyboardArrowRight />
        </button>
      </div>
    </div>
  );
}

export default ProblemCardList;
