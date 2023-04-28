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

export const checkScript = (htmlText: string) => {
  const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
  const testScript = SCRIPT_REGEX.test(htmlText);

  return testScript;
};

export const replaceURLs = (message: string) => {
  if (!message) return;

  var urlRegex = /(((https?:\/\/)|(www\.))[^\s]+)/g;
  return message.replace(urlRegex, function (url) {
    var hyperlink = url;
    if (!hyperlink.match("^https?://")) {
      hyperlink = "http://" + hyperlink;
    }
    return (
      '<a href="' +
      hyperlink +
      '" target="_blank" rel="noopener noreferrer">' +
      url +
      "</a>"
    );
  });
};

export const handleError = (err: string) => {
  message.destroy();
  message.error(err);
};

export const imgMaxSize = 5000000;
