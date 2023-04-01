import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "@stores/store";
import InputPinNum from "@components/MainPage/InputPinNum";
import "@styles/MainPage.scss";
import logo from "@assets/logo.svg";

export default function MainPage() {
  const nickname = useSelector((state: any) => state.users.nickname);
  const token = sessionStorage.getItem("accessToken");

  const navigate = useNavigate();
  const userCheck = () => {
    if (token) {
      navigate(`/mypage/${nickname}`);
    } else {
      navigate("/login");
    }
  };

  return (
    // 그리드 테스트 용입니다.
    <div className="main-page-container">
      <div className="main-content-wrapper">
        <img src={logo} alt="로고" />
        {/* {nickname && <p>{nickname}님, 어서오세요!</p>} */}
        <InputPinNum />
        <button
          type="button"
          className="main-creator-button"
          onClick={userCheck}
        >
          문제 만들기
        </button>
      </div>
      {/* 임시 바로가기 모음 */}
      {/* <div className="temps-container">
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
      </div> */}
    </div>
  );
}
