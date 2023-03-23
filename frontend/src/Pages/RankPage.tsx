import PlayerRank from "@components/RankPage/PlayerRank";
import CustomNavbar from "@components/common/CustomNavbar";
import React from "react";

export default function RankPage() {
  return (
    <div>
      <CustomNavbar />
      <div className="rank-page-container">
        <PlayerRank />
      </div>
    </div>
  );
}
