import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "@stores/store";
import InputPinNum from "@components/MainPage/InputPinNum";
import LogOut from "@components/Users/LogOut";
import "@styles/MainPage.scss";

export default function MainPage() {
  const email = useSelector((state: any) => state.users.email);
  const nickname = useSelector((state: any) => state.users.nickname);

  return (
    // 그리드 테스트 용입니다.
    <div>
      {nickname && <p>{nickname}님, 어서오세요!</p>}
      <InputPinNum />

      {/* 임시 바로가기 모음 */}
      <div className="temps-container">
        <p>🚀 임시 바로가기 모음 🚀</p>
        <Link to={`/mypage/${nickname}`}>
          <button type="button">출제자 메인 페이지</button>
        </Link>
        <Link to="/create/game">
          <button type="button">문제 출제하기</button>
        </Link>
        <Link to="/signup">
          <button type="button">회원가입</button>
        </Link>
        <Link to="/game">
          <button type="button">게임 방</button>
        </Link>
        <Link to="/game/1/rank">
          <button type="button">랭킹 페이지</button>
        </Link>
        <Link to="/modalTest">
          <button type="button"> 모달 테스트 페이지 </button>
        </Link>
        {email ? (
          <LogOut />
        ) : (
          <Link to="/login">
            <button type="button">로그인</button>
          </Link>
        )}
        <Link to="/newgame">
          <button type="button">새 게임 페이지</button>
        </Link>
        <Link to="/modalTest/2">
          <button type="button"> 각종 TEST Page </button>
        </Link>
        <Link to="/crop">
          <button type="button"> 이미지 크롭 테스트 </button>
        </Link>
      </div>
    </div>
  );
}
