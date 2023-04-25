import { Button, Card, Form, Input, message, Row } from "antd";
import { signUp } from "../../api-client/authentication";
import logo from "../../assets/logo/logoLogin.png";
import { handleErrorMessage } from "../../helper";
import Cookies from "js-cookie";
import _ from "lodash";
import React from "react";
import { ISignUp } from "../../types/userType";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import FormSignUp from "../../layout/form-signup";

export default function SignUp() {
  const router = useRouter();

  // const isAuthenticated = !!Cookies.get("token");
  // if (isAuthenticated) return router.push("/");

  const handleSubmit = async (payload: ISignUp) => {
    const params = _.pick(payload, ["username", "password", "confirm"]);
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const testScript =
      SCRIPT_REGEX.test(params.username) ||
      SCRIPT_REGEX.test(params.password) ||
      SCRIPT_REGEX.test(params.confirm);
    if (testScript) {
      message.destroy();
      message.error("Đăng ký thất bại");
      return;
    }
    try {
      await signUp(params);
      message.destroy();
      message.success("Đăng ký thành công");
      router.push("/login");
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <div className={styles.signUpContainer}>
      <div className={styles.wrapperSignUp}>
        <Card bordered className={styles.signUpForm}>
          <Row justify="center" className={styles.formTitle}>
            <Image src={logo} alt="" width={598} height={182} />
            <h3>we are laugh</h3>
          </Row>
          <FormSignUp handleSubmit={handleSubmit} />
        </Card>
      </div>
    </div>
  );
}
