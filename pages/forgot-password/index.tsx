import { requestPassword } from "../../api-client/forgotPassword";
import Loading from "../../components/loading";
import { handleErrorMessage } from "../../helper";
import React, { useState } from "react";
import Forgot from "../../layout/forgot";
import Request from "../../layout/request";
import Verify from "../../layout/verify";
import styles from "./styles.module.scss";

function ForgotPassWord() {
  const [statusForgot, setStatusForgot] = useState("forgot");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleRequest = async () => {
    const newEmail = {
      email,
    };
    try {
      setLoading(true);
      await requestPassword(newEmail);
      setStatusForgot("checkOTP");
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.forgotPassword}>
      {loading && <Loading />}

      {statusForgot === "forgot" ? (
        <Request
          email={email}
          handleRequest={handleRequest}
          handleChangeEmail={(value) => setEmail(value)}
        />
      ) : statusForgot === "checkOTP" ? (
        <Verify
          email={email}
          handleVerify={() => setStatusForgot("")}
          handleLoading={(value) => setLoading(value)}
        />
      ) : (
        <Forgot email={email} />
      )}
    </div>
  );
}

export default ForgotPassWord;
