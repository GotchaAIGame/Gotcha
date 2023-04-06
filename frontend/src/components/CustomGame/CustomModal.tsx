import React, {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
} from "react";
import { useAppDispatch, useAppSelector } from "@stores/storeHooks";
import { useNavigate } from "react-router-dom";
import { setTheme } from "@stores/player/themeSlice";
import { setGameCustom } from "@stores/game/gameSlice";
import { creatorAPI } from "@apis/apis";
import Button from "@components/common/Button";
import closeImg from "@assets/closeButton.svg";
import { resetTheme } from "@stores/player/themeSlice";
import Modal from "@components/common/Modal";
import LogoInput from "./LogoInput";
import ColorInput from "./ColorInput";
import UrlInput from "./UrlInput";
// import RewardsCheck from "./RewardsCheck";
import RewardsList from "./RewardsList";

interface modalProps {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

interface Reward {
  id: number;
  name: string;
  grade: number;
  image: string;
}

interface RewardWithoutId {
  name: string;
  grade: number;
  image: string;
}

interface RewardsState {
  rewards: Reward[];
}

export default function CustomModal(props: any) {
  const { isOpen, setIsOpen, gameInfo, setGameInfo } = props;
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [isUrlOpen, setUrlOpen] = useState<boolean>(false);

  // const [previewImg, setPreviewImg] = useState<string>("");
  // const [themeColor, setThemeColor] = useState<string>("5551FF");

  // 리워드 등록할지/ 등록되어있는지 여부
  const [isRewardOpen, setIsRewardOpen] = useState<boolean>(false);
  // 리워드 정보 저장
  const [rewardsList, setRewardsList] = useState<Reward[]>([]);
  // store에 저장된 값
  const { themeColor, themeLogo, themeTitle } = useAppSelector(
    (state: any) => state.theme
  );
  const { nickname } = useAppSelector((state: any) => state.users);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const modalHandler = () => {
    setIsOpen(!isOpen);
  };

  // img Base64 인코딩 후 저장
  const imgHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    if (e.target.files) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.onload = function (e: ProgressEvent<FileReader>): void {
        const base64 = e.target?.result as string;
        dispatch(
          setTheme({
            room: gameInfo.id,
            reward: gameInfo.hasReward,
            themeColor,
            themeLogo: base64,
            themeTitle,
          })
        );
      };

      reader.readAsDataURL(file);
    }
  };

  const colorHandler = (color: string) => {
    dispatch(
      setTheme({
        room: gameInfo.id,
        reward: gameInfo.hasReward,
        themeColor: color,
        themeLogo,
        themeTitle,
      })
    );
  };

  // 리워드 등록 on/off
  const rewardHandler = () => {
    // reward를 삭제하고 싶은 경우 삭제 API
    if (isRewardOpen === true) {
      if (gameInfo.id) {
        const roomId = gameInfo.id;
        const result = creatorAPI.deleteRewards(roomId);
        result.then((res) => {
          console.log("리워드 삭제", res);
          setIsRewardOpen(false);
        });
      }
    }
    // reward를 새로 등록
    else if (isRewardOpen === false) {
      setIsRewardOpen(true);
    }
  };

  // 최종 확인버튼
  const postTheme = () => {
    // 변경된 값으로 게임 정보 변경
    const newGameInfo = gameInfo;
    newGameInfo.color = themeColor;
    newGameInfo.logoUrl = themeLogo;

    if (isUrlOpen && urlInputRef.current) {
      newGameInfo.eventUrl = urlInputRef.current.value;
    }
    console.log(newGameInfo, "newGameInfo");
    setGameInfo(newGameInfo);

    // 테마 API
    const result = creatorAPI.putGameRoom({
      roomId: gameInfo.id,
      color: themeColor,
      logoImage: themeLogo,
      title: gameInfo.title,
      eventUrl: newGameInfo.eventUrl,
      eventDesc: gameInfo.eventDesc,
      startTime: gameInfo.startTime,
      endTime: gameInfo.endTime,
    });

    result
      .then((res) => {
        // hasReward가 false고 isRewardOpen 가 true인 경우에만 reward 생성 API 전송
        if (!gameInfo.hasReward && isRewardOpen) {
          // const rewardsInfo = {
          //   roomId: gameInfo.id,
          //   rewards: rewardsList,
          // };

          const rewardsWithoutId = rewardsList.map(
            ({ id, ...reward }) => reward
          ); // id를 제외한 RewardWithoutId 배열 생성
          const rewardsInfo = {
            roomId: gameInfo.id,
            rewards: rewardsWithoutId,
          };
          const result = creatorAPI.setRewards(rewardsInfo);

          // const result = creatorAPI.setRewards(rewardsInfo);
          result.then((res) => {
            console.log(res);
            navigate(`/mypage/${nickname}`);
          });
        }

        // hasReward가 true였던 경우 수정 API 전송(id값 포함 여부 확인)
        else if (gameInfo.hasReward && rewardsList.length > 0 && isRewardOpen) {
          const rewardsInfo = {
            roomId: gameInfo.id,
            rewards: rewardsList,
          };
          const result = creatorAPI.putRewards(rewardsInfo);
          result
            .then((res) => {
              console.log(res);
              navigate(`/mypage/${nickname}`);
            })
            .catch((res) => {
              console.log(res);
              console.log("리워드 수정 문제");
            });
        }
        // 단순히 테마 수정만 한 경우
        navigate(`/mypage/${nickname}`);
      })
      .catch((res) => {
        console.log("테마 수정 안 됨");
        console.log(res);
        // 수정안되었으니 slice에서 초기값으로 변경
        dispatch(resetTheme());
      });

    // 리워드 API
  };

  useEffect(() => {
    if (gameInfo) {
      if (gameInfo.hasReward) {
        // 등수별 정렬
        const sortedRewards = [...gameInfo.rewards].sort(
          (a, b) => a.grade - b.grade
        );
        setRewardsList(sortedRewards);
        setIsRewardOpen(true);
      } else {
        const emptyRewards = [
          { id: -1, name: "", grade: 1, image: "" },
          { id: -2, name: "", grade: 2, image: "" },
          { id: -3, name: "", grade: 3, image: "" },
        ];
        setRewardsList(emptyRewards);
      }
    }
    // console.log(rewardsList)
  }, [gameInfo, setRewardsList]);

  useEffect(() => {
    if (gameInfo.eventUrl && gameInfo.eventUrl.length) {
      setUrlOpen(true);
    }
  }, [gameInfo]);

  const SubmitModalHandler = () => {
    if (isUrlOpen && urlInputRef.current) {
      const newUrl = urlInputRef.current.value as string;
      setGameInfo({ ...gameInfo, eventUrl: newUrl });
    } else {
      setGameInfo({ ...gameInfo, eventUrl: "" });
    }

    setModalOpen(true);
  };

  return (
    <>
      {modalOpen && (
        <Modal
          open={modalOpen}
          modalHandler={() => setModalOpen(false)}
          btnType="right-two"
          mainBtnHandler={postTheme}
        >
          <h5>내용을 저장하시겠습니까?</h5>
          <p>예를 누르시면 마이페이지로 이동합니다.</p>
        </Modal>
      )}
      <div
        className="custom-modal-container"
        style={isOpen ? { right: "0" } : { left: "120%" }}
      >
        <button type="button" onClick={modalHandler} className="close-button">
          <img src={closeImg} alt="닫기" />
        </button>
        <LogoInput themeLogo={themeLogo} imgHandler={imgHandler} />
        <ColorInput themeColor={themeColor} colorHandler={colorHandler} />
        <UrlInput
          eventUrl={gameInfo.eventUrl}
          urlInputRef={urlInputRef}
          isUrlOpen={isUrlOpen}
          setUrlOpen={setUrlOpen}
        />

        <RewardsList
          rewardsList={rewardsList}
          setRewardsList={setRewardsList}
          isRewardOpen={isRewardOpen}
          rewardHandler={rewardHandler}
        />

        <br />
        <Button size="medium" text="확인" onClick={SubmitModalHandler} />
      </div>
    </>
  );
}
