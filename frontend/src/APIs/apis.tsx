import { AxiosHeaders, AxiosResponse } from "axios";
import request from "./agents";

// APis about game play
const gamePlayAPI = {
  enter: (roomCode: number): Promise<AxiosResponse> =>
    request.get("game/enter", { params: { roomCode } }),
};

const memberAPI = {
  duplicateEmail: (email: string): Promise<AxiosResponse> =>
    request.get("member/duplicateEmail", {
      params: { email },
    }),
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

export { gamePlayAPI, memberAPI, MLAPI };
