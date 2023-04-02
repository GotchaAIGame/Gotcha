import { AxiosHeaders, AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  register : (roomId: number, nickname : string, password : string ) : Promise<AxiosResponse> => 
  request.post("/game/register", { roomId, nickname, password}),
  
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
  rank: (roomId: number, nickname: string): Promise<AxiosResponse> =>
    request.post("/game/rank", { roomId, nickname }),
  // 우승상품 확인하기
  reward: (roomId: number): Promise<AxiosResponse> =>
    request.get("/game/reward", { params: { roomId } }),
  // 휴대폰 번호 입력하기
  phone: (
    roomId: number,
    nickname: string,
    phoneNumber: string
  ): Promise<AxiosResponse> =>
    request.post("/game/phonenumber", { roomId, nickname, phoneNumber }),
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
    })
};

const creatorAPI = {
  createGameRoom: (gameInfo: {
    brandColor: string;
    logoImage: string;
    title: string;
    eventUrl: string;
    eventDesc: string;
    startTime: string;
    endTime: string;
    problems: Array<
      {
        image: string;
        name: string;
        hint: string;
      }
    >;
  }): Promise<AxiosResponse> => request.authPost("set/room", gameInfo),

  // 게임 정보 수정, 테마 변경
  putGameRoom: (gameInfo: {
    roomId: number;
    color: string;
    logoImage: string;
    title: string;
    eventUrl: string;
    eventDesc: string;
    startTime: string;
    endTime: string;
  }): Promise<AxiosResponse> => request.authPut("set/room", gameInfo),

  getAllGameRoom: (userId: number, page: number): Promise<AxiosResponse> =>
    request.authGet(`member/room/${userId}`, {
      params: { page },
    }),

  getGameDetail: (roomId: number): Promise<AxiosResponse> =>
    request.authGet(`room/${roomId}`),

  // 보상 생성
  setRewards: (rewardsInfo: {
    roomId: number;
    rewards: Array<{
      name: string;
      grade: number;
      image: string;
    }>;
  }): Promise<AxiosResponse> => request.authPost("set/reward", rewardsInfo),

  // 수정 관련 Apis
};

export { gamePlayAPI, memberAPI, MLAPI, creatorAPI };
