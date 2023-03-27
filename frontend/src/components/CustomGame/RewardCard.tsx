import React from "react";

export default function RewardCard() {
  return (
    <div className="reward-card-container">
      <p>등수</p>
      <div className="file-input-wrapper">
        <label htmlFor="upload" className="file-input-label">
          <p className="file-input-label-plus">+</p>
          <p className="file-input-label-text">
            대표사진
            <br />
            추가하기
          </p>{" "}
          <input
            id="upload"
            type="file"
            accept="image/*"
            // onChange={uploadHandler}
            // ref={uploadImage}
          />
        </label>
      </div>
    </div>
  );
}
