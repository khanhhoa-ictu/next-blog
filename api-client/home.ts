import { sendGet } from "./axios";

export const getPostAll = (param: { page: number }) =>
  sendGet(`/getPost/${param.page}`);
