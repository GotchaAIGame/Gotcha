import { AxiosHeaders, AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  duplicate: (roomId: number, nickname: string): Promise<AxiosResponse> =>
    request.post("/game/duplicate", { roomId, nickname }),
  register: (
    roomId: number,
    nickname: string,
    password: string
  ): Promise<AxiosResponse> =>
    request.post("/game/register", { roomId, nickname, password }),
  getHint: (problemId: number): Promise<AxiosResponse> =>
    request.get("game/hint", { params: { problemId } }),
  enter: (roomCode: number): Promise<AxiosResponse> =>
    request.get("/game/enter", { params: { roomCode } }),
  clear: (
    roomId: number,
    nickname: string,
    solvedCnt: number,
    endTime: string
  ): Promise<AxiosResponse> =>
    request.post("game/clear", { roomId, nickname, solvedCnt, endTime }),
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
  // 랭킹 불러오기(참여자)
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
  logOut: (accessToken: string, refreshToken: string): Promise<AxiosResponse> =>
    request.authPost("member/logout", { accessToken, refreshToken }),
  editUser: (userInfo: {
    id: number;
    nickname: string;
    organization: string;
    email: string;
    registrationId: string;
    profileImage: string;
  }): Promise<AxiosResponse> => request.authPut("member", userInfo),
};

const MLAPI = {
  predict: (formData: FormData): Promise<AxiosResponse> =>
    request.postPython("python/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        "Access-Control-Allow-Origin": "*",
      },
    }),
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
    problems: Array<{
      image: string;
      name: string;
      hint: string;
    }>;
  }): Promise<AxiosResponse> => request.authPost("set/room", gameInfo),

  // 게임 정보 수s정, 테마 변경
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

  deleteGameRoom: (roomId: number): Promise<AxiosResponse> =>
  request.authDelete(`set/room`, {
    data: { roomId },
  }),


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

  // 보상 수정
  putRewards: (rewardsInfo: {
    roomId: number;
    rewards: Array<{
      id: number;
      name: string;
      grade: number;
      image: string;
    }>;
  }): Promise<AxiosResponse> => request.authPut("set/reward", rewardsInfo),

  // 보상제거
  deleteRewards: (roomId: number): Promise<AxiosResponse> =>
    request.authDelete(`set/reward`, {
      params: { roomId },
    }),

  // 단일 문제 제거
  deleteProblem: (problemId: number): Promise<AxiosResponse> =>
    request.authDelete(`set/problem`, {
      data: { problemId },
    }),
  // 수정 관련 Apis

  // 랭킹 불러오기(출제자)
  rankAll: (roomId: number): Promise<AxiosResponse> =>
    request.authGet(`/rank/${roomId}`, { params: { roomId } }),
};

export { gamePlayAPI, memberAPI, MLAPI, creatorAPI };
