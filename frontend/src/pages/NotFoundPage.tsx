import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();

  // 회원전용 페이지
  let isLoginService = false;
  if (
    location.pathname.startsWith("/mypage") || // /mypage가 안 막힘..;; 이거 고쳐야할듯!!!
    location.pathname.startsWith("/create") ||
    location.pathname.startsWith("/custom") ||
    location.pathname.startsWith("/edit")
  ) {
    isLoginService = true;
  }

  // 로그인 유저
  const token = sessionStorage.getItem("accessToken");
  let isLoginUser = false;
  if (token) {
    isLoginUser = true;
  }

  return (
    <div>
      {isLoginService && !isLoginUser ? (
        <div>
          <h1>로그인이 필요해요!</h1>
          <Link to="/login">로그인하러 가기</Link>
        </div>
      ) : (
        <div>
          <h1>잘못된 접근입니다.</h1>
          <Link to="/">홈으로 가기</Link>
        </div>
      )}
    </div>
  );
}
