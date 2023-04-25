import { message } from "antd";
import configs from "../config";

export const handleErrorMessage = (error: any) => {
  message.destroy();
  message.error(getErrorMessage(error));
  if (configs.APP_ENV !== "prod") {
    // tslint:disable-next-line: no-console
    console.log(error);
  }
};

export const getErrorMessage = (error: any) => {
  return error?.response?.data?.msg || "Something went wrong!";
};

export const convertImages = (htmlText: string) =>
  htmlText.replace(
    /<div style="text-align:none;"><img/g,
    '<div style="text-align:center;"><img'
  );

export const imgMaxSize = 5000000;
