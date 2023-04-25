import { Button, Form, Input } from "antd";
import { forgotPassWord } from "../../api-client/forgotPassword";
import React from "react";
import styles from "./style.module.scss";
import lock from "../../assets/forgot-password/lock.png";
import { handleErrorMessage } from "../../helper";
import { useRouter } from "next/router";
import Image from "next/image";

interface ForgotProps {
  email: string;
}
function Forgot({ email }: ForgotProps) {
  const router = useRouter();
  const handleSubmit = async (payload: any) => {
    const password = {
      newPassword: payload.newPassword,
      email: email,
    };
    try {
      await forgotPassWord(password);
      router.push("/login");
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  return (
    <div className={styles.forgotContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <Image src={lock} alt="" width={120} height={120} />
        </div>
      </div>
      <h3>Tạo mật khẩu mới</h3>
      <Form onFinish={handleSubmit}>
        <Form.Item
          name="newPassword"
          rules={[
            {
              required: true,
            },
          ]}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="password"
            placeholder="New password"
            className={styles.inputCustom}
            maxLength={50}
          />
        </Form.Item>

        <Form.Item
          name="confirm"
          rules={[
            {
              required: true,
            },
          ]}
          wrapperCol={{ span: 24 }}
        >
          <Input
            type="password"
            placeholder="Confirm password"
            className={styles.inputCustom}
            maxLength={50}
          />
        </Form.Item>
        <Button htmlType="submit" className={styles.submit}>
          Gửi
        </Button>
      </Form>
      <div className={styles.back} onClick={() => router.push("/login")}>
        <p>Hủy</p>
      </div>
    </div>
  );
}

export default Forgot;
