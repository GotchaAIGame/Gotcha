import React from "react";
import Button from "../common/Button";

export default function GameCard() {
  return (
    <div className="card-wrapper">
      <header>
        <h5>Game 제목</h5>
      </header>
      <article>
        <div className="logo-image-wrapper">
          <div className="card-content-title-wrapper">로고</div>
          <img
            src="https://bespokehomemeta.com/images/bespoke-logo.png"
            alt=""
          />
        </div>
        <div className="card-content-wrapper">
          <div className="card-content-title-wrapper">PIN</div>
          <p>123456</p>
        </div>
        <div className="card-content-wrapper">
          <div className="card-content-title-wrapper">기간</div>
          <div className="card-aside-wrapper">
            <p>시작 23.03.12 10:00</p>
            <p>종료 23.03.12 10:30</p>
          </div>
        </div>
        <div className="card-content-wrapper">
          <div className="card-content-title-wrapper">문제</div>
          <p>5개</p>
        </div>
        <div className="card-content-wrapper">
          <div className="card-content-title-wrapper">설명</div>
          <p>23년 상반기, 강남역에 비스포크가 떴다! 어쩌구 저쩌구 방가방가</p>
        </div>
      </article>
      <footer>
        <Button text="조기종료" size="small" color="gray" />
        <Button text="랭킹보기" size="small" color="gray" />
      </footer>
    </div>
  );
}
