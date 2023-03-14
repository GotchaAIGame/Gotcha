import React from "react";

import { Grid } from "@mui/material";
import Profile from "../Components/CreatorMain/Profile";
import GameListTap from "../Components/CreatorMain/GameListTap";
import "../Styles/CreatorMainPage.scss";

export default function CreatorMainPage() {
  return (
    <Grid container className="creator-main-container">
      <Grid container className="creator-main-items-container" xs={11} md={9}>
        <Grid item xs={12} md={4}>
          <Profile />
        </Grid>
        <Grid item xs={12} md={8} style={{ backgroundColor: "bisque" }}>
          <GameListTap />
        </Grid>
      </Grid>
    </Grid>
  );
}
