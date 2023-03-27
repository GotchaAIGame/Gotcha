import React from "react";
import PlayerRank from "@components/RankPage/PlayerRank";
import CustomNavbar from "@components/common/CustomNavbar";
import RankButtons from "@components/RankPage/RankButtons";
import Confetti from "react-confetti";

export default function RankPage() {
  return (
    <div>
      <CustomNavbar />
      <div className="rank-page-container">
        <Confetti
          numberOfPieces={100}
          gravity={0.01}
          colors={[
            "#FF8577",
            "#e91e63",
            "#9c27b0",
            "#C7B9FF",
            "#5551FF",
            "#699BF7",
            "#CFE",
            "#00bcd4",
            "#37A954",
            "#4caf50",
            "#8BC34A",
            "#8bc34a",
            "#DFF93E",
            "#ffeb3b",
            "#FFC700",
          ]}
        />
        <PlayerRank />
        <RankButtons />
      </div>
    </div>
  );
}
