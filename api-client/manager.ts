import { IPost } from "../types/managerType";
import { ICategory } from "../types/postType";

import { sendDelete, sendGet, sendPost, sendPut } from "./axios";

export const addPost = (payload: IPost) =>
  sendPost("/manager/addPost", payload);

export const getPost = () => sendGet("/manager/getPost");

export const getPostAlls = () => sendGet("/post/getAllPost");

export const deletePost = (id: number) => sendDelete(`manager/delete/${id}`);

export const getPostByCategory = (category: ICategory) =>
  sendGet(`/getPost/category/${category.category}/${category.page}`);

export const editPost = (params: any) => sendPut("/manager/editPost", params);

export const getListCategory = () => sendGet("/category");

export const handleDeleteCategory = (id: number) =>
  sendDelete(`/manager/category/delete/${id}`);

export const handleAddCategory = (category: string) =>
  sendPost("/manager/addCategory", { name_category: category });

export const handleEditCategory = (category: string, id: number) =>
  sendPut("/manager/editCategory", { name_category: category, id });
