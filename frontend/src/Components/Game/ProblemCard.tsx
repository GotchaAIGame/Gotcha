import React from "react";

function ProblemCard() {
  const problemTitle = "문제 1";
  const hasImage = false;

  return (
    <div className="outer-card-wrapper">
      <div className="problem-title-container">
        <h5>{problemTitle}</h5>
      </div>
      <div className="inner-card-container">
        <div className="original-image-container">
          <img
            src="https://user-images.githubusercontent.com/47023884/225485195-f44d038c-a859-436c-ba1a-fb27c7414062.png"
            alt="yuegui"
          />
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
