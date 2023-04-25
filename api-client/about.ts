import { IAbout } from "../types/managerType";
import { sendGet, sendPost, sendPut } from "./axios";

export const getAbout = () => sendGet("/about");

export const setAvatarAbout = (image: FormData) =>
  sendPut("/manager/about/avatar", image);

export const getEditAbout = (params: IAbout) =>
  sendPut("/manager/editAbout", params);
