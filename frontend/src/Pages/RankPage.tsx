import React from "react";
import PlayerRank from "@components/RankPage/PlayerRank";
import CustomNavbar from "@components/common/CustomNavbar";
import RankButtons from "@components/RankPage/RankButtons";

export default function RankPage() {
  return (
    <div>
      <CustomNavbar />
      <div className="rank-page-container">
        <PlayerRank />
        <RankButtons />
      </div>
    </div>
  );
}
