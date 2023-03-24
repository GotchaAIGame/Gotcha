import React, { useEffect, useState } from "react";
// import "@styles/GamePage.scss";

function ProgressBar() {
  const [progressDone, setProgressDone] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setProgressDone(true);
    }, 1000);
  });

  return (
    <div>
      {String(progressDone)}
      <div className={`progress-bar ${progressDone ? "done" : "loading"}`} />
    </div>
  );
}

export default ProgressBar;
