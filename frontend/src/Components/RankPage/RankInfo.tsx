import React from "react";
// import gold from "@assets/GoldMedal.svg";
import gold from "@assets/goldmedal.png";
import silver from "@assets/SilverMedal.svg";
import bronze from "@assets/BronzeMedal.svg";
import { Grid } from "@mui/material";

export default function RankInfo() {
  return (
    <Grid container className="rank-info-wrapper">
      <Grid item xs={3} md={3}>
        <img src={gold} alt="1등" />
      </Grid>
      <Grid item xs={4} md={4}>
        <h5>닉네임</h5>
      </Grid>
      <Grid item xs={3} md={3}>
        <p>00&#34;00&#34;00&#34;</p>
      </Grid>
    </Grid>
  );
}
