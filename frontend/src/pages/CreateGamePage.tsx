import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import InputGameInfo from "@components/CreateGame/InputGameInfo";
import GameCardCarousel from "@components/CreateGame/GameCardCarousel";
import helpButton from "@assets/questionButton.svg";
import Button from "@components/common/Button";
import Loading from "@components/common/Loading";
import CreateGameTutorialPage from "@pages/CreateGameTutorialPage";
import GlobalNavbar from "@components/common/GlobalNavbar";
import "@styles/CreateGamePage.scss";
import { creatorAPI } from "@apis/apis";
import { resetGame } from "@stores/game/gameSlice";
import { setLoading } from "@stores/loading/loadingSlice";
import Progressbar from "@components/CreateGame/Progressbar";
import Modal from "@components/common/Modal";
import fileToBase64 from "@components/common/fileToBase64";
import Hambugerbar from "@components/common/Hambugerbar";
import { ReactCropperElement } from "react-cropper";

interface problemInfo {
  id: number;
  name: React.RefObject<HTMLInputElement>;
  hint: React.RefObject<HTMLInputElement>;
  image: React.RefObject<ReactCropperElement>;
}

export default function CreateGamePage() {
  const [gameCardRefArray, setGameCardRefArray] = useState<Array<problemInfo>>([
    {
      id: 0,
      name: React.createRef<HTMLInputElement>(),
      hint: React.createRef<HTMLInputElement>(),
      image: React.createRef<ReactCropperElement>(),
    },
  ]);

  const [needHelp, setNeedHelp] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [newProblemInfotoSend, setNewProblemInfotoSend] = useState<
    Array<{ name: string; hint: string; image: string }>
  >([]);
  const gameInfo = useSelector((state: any) => state.game);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isLoading = useSelector((state: any) => state.loading);

  const tempHelperHandler = () => {
    setNeedHelp(!needHelp);
  };

  const postGameCreate = () => {
    // e.preventDefault();
    // const problemLength = gameInfo.problems.length();
    setModalOpen(false);
    // 제목, 기간, 정보 입력 여부 확인
    if (
      gameInfo.title &&
      gameInfo.startTime &&
      gameInfo.endTime &&
      gameInfo.eventDesc
    ) {
      // 문제 중 마지막 미입력값 배열이 있으면 제거
      const newGameInfo = {
        ...gameInfo,
        problems: newProblemInfotoSend,
      };
      // console.log(newGameInfo, "XX");
      const result = creatorAPI.createGameRoom(newGameInfo);
      dispatch(setLoading(true));
      result
        .then((res) => {
          // 보내는 정보
          // console.log("보낸거");
          // console.log(gameInfo);
          // console.log(res, "됐다");
          // 성공적으로 생성했다면 slice내용 비우기
          dispatch(resetGame());
          const gamePin = res.data.result.code;
          const roomId = res.data.result.id;
          dispatch(setLoading(false));

          navigate(`/custom/${gamePin}`, { state: { roomId, prevLoc : 'create' } });
        })
        .catch((res) => {
          dispatch(setLoading(false));
          alert("내용을 입력해주세요");
        });
    } else {
      dispatch(setLoading(false));
      alert("내용을 입력해주세요");
    }
  };

  const modalHandelr = async () => {
    // 모든 정보 다 받아오기
    let flag = true; // 모든 정보가 유효한지 check하기 위함

    const newProblemInfo = await Promise.all(
      gameCardRefArray.map(async (data: problemInfo, index: number) => {
        const { name, hint, image } = data;

        const nameValue = name.current?.value as string;
        const hintValue = hint.current?.value as string;
        const imageFile = image.current?.cropper
          .getCroppedCanvas({ maxHeight: 360, maxWidth: 360 })
          .toDataURL() as string;

        if (
          !(nameValue.length && hintValue.length && (imageFile.length || 0))
        ) {
          flag = false;
        }

        return {
          name: nameValue,
          hint: hintValue,
          image: imageFile,
        };
      })
    );

    if (flag) {
      setNewProblemInfotoSend(newProblemInfo);
      setModalOpen(true);
    } else {
      alert("입력되지 않은 정보가 있습니다.");
    }
  };

  return (
    <div>
      {modalOpen && (
        <Modal
          open={modalOpen}
          modalHandler={() => setModalOpen(false)}
          btnType="right-two"
          mainBtnHandler={postGameCreate}
        >
          <h5>게임을 생성하시겠습니까?</h5>
          <p>문제는 생성되면 수정할 수 없습니다.</p>
        </Modal>
      )}
      <Hambugerbar />
      <GlobalNavbar />
      {isLoading.loading && <Loading />}
      <Grid container className="create-game-grid-container">
        <Grid item xs={11} md={8}>
          <Progressbar progress={1} />
          {needHelp && (
            <div className="create-main-box-container">
              <CreateGameTutorialPage tempHelperHandler={tempHelperHandler} />
            </div>
          )}
          <div className="create-main-box-container">
            <InputGameInfo />
            <GameCardCarousel
              gameCardRefArray={gameCardRefArray}
              setGameCardRefArray={setGameCardRefArray}
            />
            <button
              type="button"
              onClick={tempHelperHandler}
              className="helper-button"
            >
              <img
                src={helpButton}
                alt="helper"
                title="도움말을 보시려면 클릭하세요"
              />
            </button>
          </div>
          <Button text="생성" onClick={modalHandelr} />
        </Grid>
      </Grid>
    </div>
  );
}
