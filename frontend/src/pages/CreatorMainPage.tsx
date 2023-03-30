import React from "react";
import { Grid } from "@mui/material";
import { useSelector } from "react-redux";
import Profile from "@components/CreatorMain/Profile";
import GameListTap from "@components/CreatorMain/GameListTap";
import "@styles/CreatorMainPage.scss";

export default function CreatorMainPage() {
  const userNickname = useSelector((state: any) => state.users.nickname);

  return (
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
  );
}
