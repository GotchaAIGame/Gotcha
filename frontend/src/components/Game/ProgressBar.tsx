import React, { useEffect, useState, useRef } from "react";
// import "@styles/GamePage.scss";

interface progressBarProps {
  resultHandler: (status: number) => void;
}

// function ProgressBar() {
function ProgressBar(props: progressBarProps) {
  const { resultHandler } = props;
  const [progressDone, setProgressDone] = useState(false);
  const progressBarRef = useRef(null);

  // Response가 들어왔을 때
  useEffect(() => {
    setTimeout(() => {
      setProgressDone(true);
    }, 1000);
  });

  // ProgresBar가 끝까지 갔을 때
  useEffect(() => {
    return () => {
      console.log("바뀜!");
      resultHandler(2);
    };
  }, [progressBarRef.current]);

  return (
    <div>
      {/* {String(progressDone)} */}
      <div
        className={`progress-bar ${progressDone ? "done" : "loading"}`}
        ref={progressBarRef}
      />
    </div>
  );
}

export default ProgressBar;
