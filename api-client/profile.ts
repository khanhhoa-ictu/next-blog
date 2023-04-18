import { IProfile } from "../types/managerType";
import { IAbout } from "../types/userType";
import { sendGet, sendPut } from "./axios";

// eslint-disable-next-line import/prefer-default-export
export const getProfile = () => sendGet("/user/profile");

export const setProfileAbout = (params: IAbout) =>
  sendPut("/profile/about", params);

export const setProfileDetail = (params: IProfile) =>
  sendPut("profile/detail", params);

export const setAvatar = (params: FormData) =>
  sendPut("profile/avatar", params);

export const getProfileById = (id: number) =>
  sendGet(`/user/profileById/${id}`);
