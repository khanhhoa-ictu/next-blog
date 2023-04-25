import { forgotPassword } from "../types/userType";
import { sendPost } from "./axios";

export const requestPassword = (email: forgotPassword) =>
  sendPost("/forgot/request", email);

export const verifyPassword = (otp: forgotPassword) =>
  sendPost("/forgot/verify", otp);

export const forgotPassWord = (newPassword: forgotPassword) =>
  sendPost("/forgot/password", newPassword);
