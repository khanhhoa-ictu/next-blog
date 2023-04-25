import { Button, Input } from "antd";
import { verifyPassword } from "../../api-client/forgotPassword";
import React, { useState } from "react";
import styles from "./style.module.scss";
import lock from "../../assets/forgot-password/lock.png";
import { handleErrorMessage } from "../../helper";
import { useRouter } from "next/router";
import Image from "next/image";
interface VerifyProps {
  handleVerify: () => void;
  email: string;
  handleLoading: (value: boolean) => void;
}
function Verify({ handleVerify, email, handleLoading }: VerifyProps) {
  const [otp, setOTP] = useState("");
  const router = useRouter();
  const handleSubmit = async () => {
    const newEmail = {
      otp,
      email,
    };

    try {
      handleLoading(true);
      await verifyPassword(newEmail);
      setOTP("");
      handleVerify();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      handleLoading(false);
    }
  };
  return (
    <div className={styles.forgotContainer}>
      <div className={styles.iconContainer}>
        <div className={styles.icon}>
          <Image src={lock} alt="" width={120} height={120} />
        </div>
      </div>
      <h3>Quên mật khẩu</h3>
      <p>Nhập mã OTP</p>
      <p>
        Chúng tôi đã gửi đến gmail của bạn một mã OPT hãy kiểm tra hom thư đến
        hoặc (thư mục spam)
      </p>
      <Input
        type="email"
        value={otp}
        onChange={(e) => setOTP(e.target.value)}
        placeholder="nhập mã OTP"
        className={styles.inputCustom}
        maxLength={50}
      />
      <Button onClick={handleSubmit} className={styles.submit}>
        Gửi mã
      </Button>
      <div className={styles.back} onClick={() => router.push("/login")}>
        <p>Hủy</p>
      </div>
    </div>
  );
}

export default Verify;
