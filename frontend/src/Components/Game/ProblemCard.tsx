import React from "react";

interface problemProps {
  problem: {
    problemId: number;
    problemName: string;
    problemDesc: string;
    problemImgURL: string;
  };
}

function ProblemCard(props: problemProps) {
  const { problem } = props;
  const { problemId, problemName, problemDesc, problemImgURL } = problem;

  const hasImage = false;

  return (
    <div className="outer-card-wrapper">
      <div className="problem-title-container">
        <h5>{problemName}</h5>
      </div>
      <div className="inner-card-container">
        <div className="original-image-container">
          <img src={problemImgURL} alt={problemName} />
        </div>
        <div className="input-image-container">
          {hasImage ? (
            <img
              src="https://user-images.githubusercontent.com/47023884/225485195-f44d038c-a859-436c-ba1a-fb27c7414062.png"
              alt="yuegui"
            />
          ) : (
            <form className="empty-image-container">
              <h1> + </h1>
              <h5 id="take-pic"> 사진 찍기 </h5>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProblemCard;
