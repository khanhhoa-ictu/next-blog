import { ILogin, ISignUp } from "../types/userType";
import { sendPost, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const login = (payload: ILogin) => sendPost("/login", payload);
export const signUp = (payload: ISignUp) => sendPost("/register", payload);
export const changePassWord = (payload: any) =>
  sendPut(
    "https://training-api.test.amela.vn/v1/app/auth/change-password",
    payload
  );
