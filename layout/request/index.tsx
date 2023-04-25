import { Button, Input } from "antd";
import React from "react";
import styles from "./style.module.scss";
import lock from "../../assets/forgot-password/lock.png";
import { useRouter } from "next/router";
import Image from "next/image";

interface RequestProps {
  handleRequest: () => void;
  email: string;
  handleChangeEmail: (value: string) => void;
}

function Request(props: RequestProps) {
  const { handleRequest, email, handleChangeEmail } = props;
  const router = useRouter();
  return (
    <div className={styles.forgotContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <Image src={lock} alt="" width={120} height={120} />
        </div>
      </div>

      <h3>Bạn gặp sự cố khi đăng nhập?</h3>
      <p>
        Nhập email của bạn và chúng tôi sẽ gửi cho bạn mã xác minh để truy cập
        lại tài khoản
      </p>
      <Input
        type="email"
        value={email}
        onChange={(e) => handleChangeEmail(e.target.value)}
        placeholder="email"
        className={styles.inputCustom}
      />
      <Button onClick={() => handleRequest()} className={styles.submit}>
        Gửi mã xác nhận
      </Button>
      <div className={styles.back} onClick={() => router.back()}>
        <p>Quay lại trang trước</p>
      </div>
    </div>
  );
}

export default Request;
