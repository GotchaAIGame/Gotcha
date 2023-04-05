import React from "react";
import LogIn from "@components/Users/LogIn";
import GlobalNavbar from "@components/common/GlobalNavbar";
import "@styles/LogInPage.scss";

export default function LogInPage() {
  return (
    <div className="login-page-container">
      <GlobalNavbar />
      <LogIn />
    </div>
  );
}
