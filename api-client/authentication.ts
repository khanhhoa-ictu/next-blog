import { ILogin, ISignUp } from "../types/userType";
import { sendPost } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const login = (payload: ILogin) => sendPost("/login", payload);
export const signUp = (payload: ISignUp) => sendPost("/register", payload);
