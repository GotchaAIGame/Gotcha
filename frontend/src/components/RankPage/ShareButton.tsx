import React from "react";
import "@styles/RankPage.scss";

export default function ShareButton() {
  const shareClickHandler = () => {
    console.log("click!!");
  };
  return (
    <button
      type="button"
      aria-label="share-btn"
      className="rank-share-button"
      onClick={shareClickHandler}
    />
  );
}
