import { IAddComment, IAddReply } from "../types/postType";
import { sendDelete, sendGet, sendPost } from "./axios";

export const getPostDetail = (slug: string) =>
  sendGet(`/getPostDetail/${slug}`);

export const getComment = (id: number) => sendGet(`/comment/${id}`);

export const addComment = (params: IAddComment) =>
  sendPost("/comment/add", params);

export const addReply = (params: IAddReply) => sendPost("/reply/add", params);

export const deleteComment = (id: number) =>
  sendDelete(`/comment/delete/${id}`);

export const getPostDetailAdmin = (id: number) =>
  sendGet(`/postDetail/admin/${id}`);

export const deleteCommentReply = (id: number) =>
  sendDelete(`/comment/reply/${id}`);
