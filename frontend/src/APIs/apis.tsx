import { AxiosHeaders, AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<AxiosResponse> =>
    request.get("/game/enter", { params: { roomCode } }),
  // 게임 재참여
  rejoin: (roomId: number, nickname: string): Promise<AxiosResponse> =>
    request.post("/game/rejoin", { params: { roomId, nickname } }),
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
};

export { gamePlayAPI, memberAPI, MLAPI, creatorAPI };
