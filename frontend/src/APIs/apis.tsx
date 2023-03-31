import { AxiosHeaders, AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<AxiosResponse> =>
    request.get("/game/enter", { params: { roomCode } }),
  // 게임 신규참여
  start: (
    roomId: number,
    nickname: string,
    startTime: string
  ): Promise<AxiosResponse> =>
    request.post("/game/start", { roomId, nickname, startTime }),
  // 게임 재참여
  rejoin: (roomId: number, nickname: string): Promise<AxiosResponse> =>
    request.post("/game/rejoin", { roomId, nickname }),
  // 재참여 로그인
  login: (
    roomId: number,
    nickname: string,
    password: number
  ): Promise<AxiosResponse> =>
    request.post("/game/login", { roomId, nickname, password }),
  // 랭킹 불러오기
};

const memberAPI = {
  duplicateEmail: (email: string): Promise<AxiosResponse> =>
    request.get("member/duplicateEmail", {
      params: { email },
    }),
  duplicateNickName: (nickname: string): Promise<AxiosResponse> =>
    request.get("member/duplicateNickname", {
      params: { nickname },
    }),
  signUp: (userInfo: {
    nickname: string;
    password: string;
    organization: string;
    email: string;
  }): Promise<AxiosResponse> => request.post("member/signup", userInfo),
  logIn: (email: string, password: string): Promise<AxiosResponse> =>
    request.post("member/login", { email, password }),
};

const MLAPI = {
  predict: (formData: FormData): Promise<AxiosResponse> =>
    request.postPython("game/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    }),
};

const creatorAPI = {
  createGameRoom: (gameInfo: {
    brandColor: string;
    logoUrl: string;
    title: string;
    eventUrl: string;
    description: string;
    hasReward: boolean;
    startTime: string;
    endTime: string;
    problems: [
      {
        image: string;
        name: string;
        description: string;
        hint: string;
      }
    ];
  }): Promise<AxiosResponse> => request.authPost("set/room", gameInfo),

  getAllGameRoom: (userId: number, page: number): Promise<AxiosResponse> =>
    request.authGet(`member/room/${userId}`, {
      params: { page },
    }),

  getGameDetail: (roomId: number): Promise<AxiosResponse> =>
    request.authGet(`room/${roomId}`),

  // 보상 생성
  setRewards: (rewardsInfo: {
    roomId: number;
    rewards: Array<
      {
        name: string;
        grade: number;
        image: string;
      }>
    ;
  }): Promise<AxiosResponse> => request.authPost("set/reward", rewardsInfo),

  // 수정 관련 Apis
  
};

export { gamePlayAPI, memberAPI, MLAPI, creatorAPI };
