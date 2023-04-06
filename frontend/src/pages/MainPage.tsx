import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
// import store from "@stores/store";
import InputPinNum from "@components/MainPage/InputPinNum";
import "@styles/MainPage.scss";
import logo from "@assets/logo.svg";
import { useTitle } from "@hooks/useTitle";

export default function MainPage() {
  useTitle("Gotcha!");
  const nickname = useSelector((state: any) => state.users.nickname);
  const token = sessionStorage.getItem("accessToken");

  const temp = localStorage.getItem("solved");
  // console.log(temp);

  useEffect(() => {
    console.log(
      `
%c ██████╗  ██████╗ ████████╗ ██████╗██╗  ██╗ █████╗ ██╗             
%c██╔════╝ ██╔═══██╗╚══██╔══╝██╔════╝██║  ██║██╔══██╗██║             
%c██║  ███╗██║   ██║   ██║   ██║     ███████║███████║██║             
%c██║   ██║██║   ██║   ██║   ██║     ██╔══██║██╔══██║╚═╝             
%c╚██████╔╝╚██████╔╝   ██║   ╚██████╗██║  ██║██║  ██║██╗             
%c ╚═════╝  ╚═════╝    ╚═╝    ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝             
                                                                    
%c ██████╗██╗   ██╗███████╗████████╗ ██████╗ ███╗   ███╗             
%c██╔════╝██║   ██║██╔════╝╚══██╔══╝██╔═══██╗████╗ ████║             
%c██║     ██║   ██║███████╗   ██║   ██║   ██║██╔████╔██║             
%c██║     ██║   ██║╚════██║   ██║   ██║   ██║██║╚██╔╝██║             
%c╚██████╗╚██████╔╝███████║   ██║   ╚██████╔╝██║ ╚═╝ ██║             
%c ╚═════╝ ╚═════╝ ╚══════╝   ╚═╝    ╚═════╝ ╚═╝     ╚═╝             
                                                                    
%c █████╗ ██╗    ███████╗███████╗██████╗ ██╗   ██╗██╗ ██████╗███████╗
%c██╔══██╗██║    ██╔════╝██╔════╝██╔══██╗██║   ██║██║██╔════╝██╔════╝
%c███████║██║    ███████╗█████╗  ██████╔╝██║   ██║██║██║     █████╗  
%c██╔══██║██║    ╚════██║██╔══╝  ██╔══██╗╚██╗ ██╔╝██║██║     ██╔══╝  
%c██║  ██║██║    ███████║███████╗██║  ██║ ╚████╔╝ ██║╚██████╗███████╗
%c╚═╝  ╚═╝╚═╝    ╚══════╝╚══════╝╚═╝  ╚═╝  ╚═══╝  ╚═╝ ╚═════╝╚══════╝
                                                                    
`,
      "color:#211eff",
      "color:#4643ff",
      "color:#5551ff",
      "color:#699bf7",
      "color:#9ec5ff",
      "color:#cfe2ff",
      "color:#211eff",
      "color:#4643ff",
      "color:#5551ff",
      "color:#699bf7",
      "color:#9ec5ff",
      "color:#cfe2ff",
      "color:#211eff",
      "color:#4643ff",
      "color:#5551ff",
      "color:#699bf7",
      "color:#9ec5ff",
      "color:#cfe2ff"
    );
  });

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
        <InputPinNum />
        <button
          type="button"
          className="main-creator-button"
          onClick={userCheck}
        >
          문제 만들기
        </button>
      </div>
    </div>
  );
}
