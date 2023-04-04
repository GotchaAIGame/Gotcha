import React from "react";

export default function Progressbar(props: any) {
  const { progress } = props;

  return (
    <div className="progress-bar-wrapper">
      <hr />
      <div className="progressbar-tags-container">
        {/* 1: 기본 게임 생성 */}
        <div className="progress-bar-point-wrapper">
          <div
            className={
              progress >= 1 ? "active-bar-point" : "progress-bar-point"
            }
          />
        </div>
        {/* 2: 커스터마이징 */}
        <div className="progress-bar-point-wrapper">
          <div
            className={
              progress >= 2 ? "active-bar-point" : "progress-bar-point"
            }
          />
        </div>
      </div>
      <div className="progressbar-tags-container">
        <span className={progress === 1 ? "progress-active-text" : ""}>
          기본 게임 생성
        </span>
        <span
          className={
            progress === 2 && progress > 1 ? "progress-active-text" : ""
          }
        >
          커스터마이징
        </span>
      </div>
    </div>
  );
}
