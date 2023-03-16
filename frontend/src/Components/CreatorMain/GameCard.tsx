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
          <Button size="xxsmall" color="lime" text="로고" />
          <img
            src="https://bespokehomemeta.com/images/bespoke-logo.png"
            alt=""
          />
        </div>
        <div>
          <Button size="xxsmall" color="lime" text="PIN" />
          <span>123456</span>
        </div>
        <div>
          <Button size="xxsmall" color="lime" text="기간" />
          <p>시작 23.03.12 10:00</p>
          <p>종료 23.03.12 10:30</p>
        </div>
        <Button size="xxsmall" color="lime" text="문제" />
        <p>5개</p>
        <Button size="xxsmall" color="lime" text="문제" />
        <p>23년 상반기, 강남역에 비스포크가 떴다!</p>
      </article>
      <footer>
        <Button text="조기종료" size="small" color="gray" />
        <Button text="랭킹보기" size="small" color="gray" />
      </footer>
    </div>
  );
}
