import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "../stores/store";
import InputPinNum from "@components/MainPage/InputPinNum";
import LogOut from "@components/Users/LogOut";
import "@styles/MainPage.scss";

export default function MainPage() {
  const userId = useSelector((state: any) => state.users.userId);

  return (
    // 그리드 테스트 용입니다.
    <>
      <h3>Main</h3>
      {userId && <p>{userId}님, 어서오세요!</p>}
      <InputPinNum />
      {/* 임시 바로가기 모음 */}
      <div className="temps-container">
        <p>🚀 임시 바로가기 모음 🚀</p>
        <Link to="/creator">
          <button type="button">출제자 메인 페이지</button>
        </Link>
        <Link to="/create/game">
          <button type="button">문제 출제하기</button>
        </Link>
        <Link to="/signup">
          <button type="button">회원가입</button>
        </Link>
        {userId ? (
          <LogOut />
        ) : (
          <Link to="/login">
            <button type="button">로그인</button>
          </Link>
        )}
        <Link to="/newgame">
          <button type="button">새 게임 페이지</button>
        </Link>
      </div>
    </>
  );
}
