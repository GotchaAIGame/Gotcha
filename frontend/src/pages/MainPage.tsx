import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import InputPinNum from "@components/MainPage/InputPinNum";
import { useTitle } from "@hooks/useTitle";
import "@styles/MainPage.scss";
import logo from "@assets/logo.svg";

export default function MainPage() {
  useTitle("Gotcha!");
  const token = sessionStorage.getItem("accessToken");
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
      navigate("/mypage");
    } else {
      navigate("/login");
    }
  };

  return (
    // 그리드 테스트 용입니다.
    <div className="main-page-container">
      <div className="main-content-wrapper">
        <img src={logo} alt="로고" className="main-logo-img"/>
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
