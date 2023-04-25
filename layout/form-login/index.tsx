import { Button, Form, Input } from "antd";
import React from "react";
import styles from "./styles.module.scss";
import CommonInput from "../../components/common-input";
import Link from "next/link";
import CommonButtonSubmit from "../../components/common-button-submit";

interface FormLoginProps {
  handleSubmit: (payload: any) => void;
}
function FormLogin({ handleSubmit }: FormLoginProps) {
  return (
    <Form onFinish={handleSubmit} className={styles.formContainerItem}>
      <CommonInput
        name="username"
        ruleMessage="Username không được để trống"
        className={styles.customInputLogin}
        placeholder="Tên tài khoản"
        maxLength={50}
      />

      <CommonInput
        name="password"
        ruleMessage="Password không được để trống"
        className={styles.customInputLogin}
        placeholder="Mật khẩu"
        maxLength={50}
        type="password"
      />

      <CommonButtonSubmit className={styles.btnLogin} text="Đăng nhập" />

      <Form.Item labelCol={{ span: 24 }} className={styles.forgotPassword}>
        <Link href="/forgot-password">Quên mật khẩu</Link>
      </Form.Item>
    </Form>
  );
}

export default FormLogin;
