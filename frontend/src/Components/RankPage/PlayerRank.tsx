import React from "react";
import "@styles/RankPage.scss";
import title from "@assets/RankingFlag.svg";

export default function PlayerRank() {
  return (
    <section className="player-rank-wrapper">
      <header className="ranking-title-flag">
        <h1>Ranking</h1>
      </header>
      <article>
        <div>1등</div>
        <div>2등</div>
        <div>3등</div>
      </article>
    </section>
  );
}
