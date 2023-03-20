import React from "react";
import "@styles/GamePage.scss";
import ProblemTitle from "@components/Game/ProblemTitle";
import Timer from "@components/Game/Timer";
import ProblemCardList from "@components/Game/ProblemCardList";

export default function GamePage() {
  const roomTitle = "같은 것을 찾아라 같챠!";

  return (
    <div className="gamepage">
      <ProblemTitle />
      <Timer />
      <ProblemCardList />
    </div>
  );
}
