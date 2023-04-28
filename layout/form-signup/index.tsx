import { Form, Input, Button } from "antd";
import Link from "next/link";
import React from "react";
import styles from "./styles.module.scss";
import { ISignUp } from "../../types/userType";
import CommonInput from "../../components/common-input";

interface FormSignUpProps {
  handleSubmit: (payload: ISignUp) => void;
}
function FormSignUp({ handleSubmit }: FormSignUpProps) {
  return (
    <Form onFinish={handleSubmit} className={styles.formContainer}>
      <CommonInput
        name="username"
        ruleMessage="Username không được để trống"
        className={styles.customInputSignUp}
        placeholder="Tên tài khoản"
        maxLength={50}
      />

      <CommonInput
        name="password"
        ruleMessage="password không được để trống"
        className={styles.customInputSignUp}
        placeholder={"Mật khẩu"}
        maxLength={50}
        type="password"
      />

      <Form.Item
        name="confirm"
        rules={[
          { required: true, message: "password không được để trống" },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue("password") === value) {
                return Promise.resolve();
              }

              return Promise.reject(new Error("mật khẩu không trùng khớp"));
            },
          }),
        ]}
        dependencies={["password"]}
        labelAlign="left"
        labelCol={{ span: 24 }}
        wrapperCol={{ span: 24 }}
      >
        <Input.Password
          className={styles.customInputSignUp}
          placeholder={"Xác nhận mật khẩu"}
        />
      </Form.Item>

      <Form.Item labelCol={{ span: 24 }}>
        <Button
          block
          type="primary"
          htmlType="submit"
          className={styles.btnSignUp}
        >
          Đăng ký
        </Button>
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }}>
        <p>
          <Link href="/login">Đăng nhập</Link>
        </p>
      </Form.Item>
    </Form>
  );
}

export default FormSignUp;
