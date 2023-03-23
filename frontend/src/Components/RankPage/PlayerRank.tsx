import React from "react";
import { Grid } from "@mui/material";
import RankInfo from "./RankInfo";
import "@styles/RankPage.scss";
// import title from "@assets/RankingFlag.svg";

export default function PlayerRank() {
  return (
    <section className="player-rank-wrapper">
      <header className="ranking-title-flag">
        <h1>Ranking</h1>
      </header>
      <Grid container className="rank-header">
        <Grid item xs={3} md={3}>
          <h5 className="rank-box1">등수</h5>
        </Grid>
        <Grid item xs={4} md={4}>
          <h5 className="rank-box2">닉네임</h5>
        </Grid>
        <Grid item xs={3} md={3}>
          <h5 className="rank-box3">시간</h5>
        </Grid>
      </Grid>
      
      집가서 할 것!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      RankInfo에 scss 적용해서 rank===1이면 gold, 2면 silver, 3이면 bronze, else면 nomedal
      컴포넌트화시켜서 적용해둘것!!!!!!!!!!
      <RankInfo />
      <RankInfo />
      <RankInfo />
      <RankInfo />
    </section>
  );
}
