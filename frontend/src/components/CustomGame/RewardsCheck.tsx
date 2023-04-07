import React, { useState, useEffect } from "react";
import CustomModal from "@components/CustomGame/CustomModal";
import { useSelector, useDispatch } from "react-redux";
import { setRewards } from "@stores/game/rewardsSlice";
import RewardList from "./RewardsList";

export default function RewardsCheck(props: any) {
  const { gameInfo, setGameInfo } = props;

  const rewardsList = useSelector((state: any) => state.rewards);
  const dispatch = useDispatch();

  useEffect(() => {
    if (gameInfo.rewards) {
      dispatch(setRewards({ rewards: gameInfo.rewards }));
    } else {
      const emptyRewards = [
        {
          id: -1,
          name: "",
          grade: 1,
          image: "",
        },
        {
          id: -2,
          name: "",
          grade: 2,
          image: "",
        },
        {
          id: -3,
          name: "",
          grade: 3,
          image: "",
        },
      ];
      dispatch(setRewards({ rewards: emptyRewards }));
    }
  }, [gameInfo.rewards, dispatch]);

  return (
    <div>

        <div>
          <p>있다</p>
          {rewardsList.rewards.map((item: any) => {
            return (
              <div key={item.id}>
                <p>{item.id}</p>
                <p>{item.name}</p>
                <p>{item.grade}</p>
                <img src={item.image} alt="" />
              </div>
            );
          })}
          <input type="text" />
        </div>

    </div>
  );
}
