import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "@stores/store";
import InputPinNum from "@components/MainPage/InputPinNum";
import LogOut from "@components/Users/LogOut";
import "@styles/MainPage.scss";
import Button from "@components/common/Button";
// import Modal from "@components/common/Modal";

export default function MainPage() {
  const userId = useSelector((state: any) => state.users.userId);

  return (
    // 그리드 테스트 용입니다.
    <>
      <h3>Main</h3>
      {userId && <p>{userId}님, 어서오세요!</p>}
      <InputPinNum />
      <Link to="/rejoin" className="rejoin-link">
        <h3>게임에 이미 참여하신 적이 있나요?</h3>
      </Link>

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
        <Link to="/game/1">
          <button type="button">게임 방</button>
        </Link>
        <Link to="/modalTest">
          <button type="button"> 모달 테스트 페이지 </button>
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

        <Link to="/modalTest/2">
          <button type="button"> 모달 테스트 2 큭큭 </button>
        </Link>
      </div>
    </>
  );
}
