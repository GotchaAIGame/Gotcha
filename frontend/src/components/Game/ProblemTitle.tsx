import React from "react";
import questionButton from "@assets/questionButton.svg";

function ProblemTitle() {
  const problemTitle = "월계를 찾아라! 월계!";
  return (
    <div className="problem-title-wrapper">
      <img
        src={questionButton}
        alt="questionButton"
        className="img-questionButtom"
      />
      <h5> {problemTitle} </h5>
    </div>
  );
}

export default ProblemTitle;
