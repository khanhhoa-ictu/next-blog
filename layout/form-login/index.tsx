import { Button, Form, Input } from "antd";
import React from "react";
import styles from "./styles.module.scss";

interface FormLoginProps {
  handleSubmit: (payload: any) => void;
}
function FormLogin({ handleSubmit }: FormLoginProps) {
  return (
    <Form onFinish={handleSubmit} className={styles.formContainerItem}>
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Username không được để trống",
            whitespace: true,
          },
        ]}
        wrapperCol={{ span: 24 }}
      >
        <Input
          className={styles.customInputLogin}
          placeholder="Tên tài khoản"
          maxLength={50}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: "Password không được để trống" }]}
        wrapperCol={{ span: 24 }}
      >
        <Input.Password
          className={styles.customInputLogin}
          placeholder="Mật khẩu"
          maxLength={50}
        />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }}>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.btnLogin}
        >
          {"Đăng nhập"}
        </Button>
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.forgotPassword}>
        {/* <NavLink to="/forgot-password">Quên mật khẩu</NavLink> */}
      </Form.Item>
    </Form>
  );
}

export default FormLogin;
