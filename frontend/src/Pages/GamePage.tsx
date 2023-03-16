import React from "react";
import "@styles/GamePage.scss";
import ProblemTitle from "../Components/Game/ProblemTitle";
import Timer from "../Components/Game/Timer";
import ProblemCardList from "../Components/Game/ProblemCardList";

export default function GamePage() {
  const roomTitle = "같은 것을 찾아라 같챠!";

  return (
    <div>
      <ProblemTitle />
      <Timer />
      <ProblemCardList />
    </div>
  );
}
