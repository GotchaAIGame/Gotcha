import React from "react";
import { useDispatch } from "react-redux";
import { setLogout } from "../../stores/users/userSlice";

export default function LogOut() {
  const dispatch = useDispatch();

  // 임시 로그아웃
  const logoutHandler = () => {
    dispatch(setLogout());
    alert("다음에 또 만나요!");
  };
  return (
    <button type="button" onClick={logoutHandler}>
      로그아웃
    </button>
  );
}
