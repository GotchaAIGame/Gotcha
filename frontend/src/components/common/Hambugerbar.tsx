import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import "./styles/Hamburgerbar.scss";
import { Cookies, useCookies } from "react-cookie";
import { memberAPI } from "@apis/apis";
import { useDispatch } from "react-redux";
import { setLogout } from "@stores/users/userSlice";

export default function Hambugerbar() {
  const [cookies, setCookie] = useCookies(["refreshToken"]);

  const nickname = useSelector((state: any) => state.users.nickname);
  const token = sessionStorage.getItem("accessToken");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const menuOnClick = () => {
    const menuBar = document.getElementById("menu-bar");
    const nav = document.getElementById("nav");
    const menuBg = document.getElementById("menu-bg");
    if (menuBar && nav && menuBg) {
      menuBar.classList.toggle("change");
      nav.classList.toggle("change");
      menuBg.classList.toggle("change-bg");
    }
  };

  const userCheck = () => {
    if (token) {
      navigate(`/mypage/${nickname}`);
    } else {
      navigate("/login");
    }
  };

  const logoutHandler = () => {
    const accessToken = sessionStorage.getItem("accessToken");
    const { refreshToken } = cookies;

    if (accessToken && refreshToken) {
      // API 임시 제거
      const result = memberAPI.logOut(accessToken, refreshToken);
      result
        .then(() => {
          dispatch(setLogout());
          sessionStorage.setItem("accessToken", "");
          setCookie("refreshToken", "");
          alert("다음에 또 봐요!");
          navigate("/");
        })
    }
  };

  return (
    <div>
      <div id="menu">
        <button
          id="menu-bar"
          className="menu-bar"
          type="button"
          onClick={menuOnClick}
          aria-label="Toggle Menu"
          aria-expanded="false"
        >
          <div id="bar1" className="bar" />
          <div id="bar2" className="bar" />
          <div id="bar3" className="bar" />
        </button>
        <nav className="nav" id="nav">
          <ul>
            <li>
              <button type="button" onClick={() => navigate("/")}>
                Main
              </button>
            </li>
            <li>
              <button type="button" onClick={userCheck}>
                My Page
              </button>
            </li>
            <li>
              <button type="button" onClick={logoutHandler}>
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <div id="menu-bg" className="menu-bg" />
    </div>
  );
}
