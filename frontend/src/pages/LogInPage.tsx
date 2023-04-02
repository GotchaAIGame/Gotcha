import React from "react";
import { Link } from "react-router-dom";
import LogIn from "@components/Users/LogIn";
import "@styles/LogInPage.scss";
import banner from "@assets/TopBanner.svg";
import logo from "@assets/logo.svg";
import GlobalNavbar from "@components/common/GlobalNavbar";

export default function LogInPage() {
  return (
    <div className="login-page-container">
      <GlobalNavbar />
      <LogIn />
    </div>
  );
}
