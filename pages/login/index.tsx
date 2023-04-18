import { Card, message, Row } from "antd";
import Cookies from "js-cookie";
import _ from "lodash";
import Link from "next/link";
import { useRouter } from "next/router";
import { login } from "../../api-client/authentication";
import logoLogin from "../../assets/login/login-1.svg";
import logo from "../../assets/logo/logoLogin.png";
import RightDriver from "../../components/right-driver";
import FormLogin from "../../layout/form-login";
import { ILogin } from "../../types/userType";
import { handleErrorMessage } from "./../../helper";
import styles from "./style.module.scss";
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  //   const isAuthenticated = !!Cookies.get("token");
  //   if (isAuthenticated) return router.push("/");

  const handleSubmit = async (payload: ILogin) => {
    const params = _.pick(payload, ["username", "password"]);
    const SCRIPT_REGEX = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi;
    const testScript =
      SCRIPT_REGEX.test(params.username) || SCRIPT_REGEX.test(params.password);
    if (testScript) {
      message.destroy();
      message.error("Đăng nhập thất bại");
      return;
    }
    try {
      const data = await login(params);
      const { token, refreshToken } = data;
      Cookies.set("token", token, {
        expires: payload.rememberMe ? 10000 : 10000,
      });
      Cookies.set("refreshToken", refreshToken, {
        expires: payload.rememberMe ? 10000 : 10000,
      });
      router.push("/");
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.wrapperLogin}>
        <div className={styles.formContainer}>
          <Card bordered className={styles.loginForm}>
            <Row justify="center" className={styles.formTitle}>
              <Image src={logo} alt="" />
              <h3>we are laugh</h3>
            </Row>
            <FormLogin handleSubmit={handleSubmit} />
          </Card>

          <Card className={styles.signUp} bordered>
            <Row justify="center" className={styles.formTitle}>
              <h3>
                Nếu chưa có tài khoản vui lòng{" "}
                <Link href="/sign-up">đăng ký</Link>
              </h3>
            </Row>
          </Card>
        </div>

        <RightDriver />
      </div>
      <div className={styles.wrapperImage}>
        <Image src={logoLogin} alt="" />
      </div>
    </div>
  );
}
