import React from "react";
import { Grid } from "@mui/material";
import Profile from "@components/CreatorMain/Profile";
import GameListTap from "@components/CreatorMain/GameListTap";
import "@styles/CreatorMainPage.scss";

export default function CreatorMainPage() {
  return (
    <Grid container className="creator-main-container">
      <Grid container className="creator-main-items-container" xs={11} md={9}>
        <Grid item xs={12} md={4} className="profile-wrapper">
          <Profile />
        </Grid>
        <Grid item xs={12} md={8}>
          <GameListTap />
        </Grid>
      </Grid>
    </Grid>
  );
}
