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
      if (progressBarRef.current) {
        // 로딩이 끝까지 갔을 때
        resultHandler(2);
      } else {
        // if null (모달 창이 꺼졌을 때)
        resultHandler(0);
      }
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
