import { sendDelete, sendGet } from "./axios";

export const getUser = () => sendGet("/manager/user");

export const deleteUser = (id: number) => sendDelete(`/manager/user/${id}`);
