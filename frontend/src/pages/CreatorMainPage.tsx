import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Profile from "@components/CreatorMain/Profile";
import GameListTap from "@components/CreatorMain/GameListTap";
import "@styles/CreatorMainPage.scss";
import GlobalNavbar from "@components/common/GlobalNavbar";
import bgStar1 from "@assets/bg-littile-start.svg";

export default function CreatorMainPage() {
  const userNickname = useSelector((state: any) => state.users.nickname);

  return (
    <div className="creator-bg-container">
      <div className="creator-bg" />
      {/* <img src={bgStar1} className="star1" alt="" /> */}
      {/* <img src={bgStar1} className="star2" alt="" /> */}
      <Grid container className="creator-main-container">
        {userNickname && (
          <Grid item xs={11} md={9} className="welcome-text-wrapper">
            <span className="welcome-name">{userNickname}</span>
            <span className="welcome-text">님, 어서오세요!</span>
          </Grid>
        )}
        <Grid item xs={11} md={9}>
          <Grid container className="creator-main-items-container">
            <Grid item xs={12} md={4} className="profile-wrapper">
              <Profile />
            </Grid>
            <Grid item xs={12} md={8}>
              <GameListTap />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
