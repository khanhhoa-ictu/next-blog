import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, message } from "antd";
import { useForm } from "antd/lib/form/Form";
import Input from "antd/lib/input/Input";
import TextArea from "antd/lib/input/TextArea";
import { getAbout, getEditAbout, setAvatarAbout } from "api-client/about";
import noAvatar from "assets/images/no-avatar.png";
import Loading from "components/loading";
import { handleErrorMessage, imgMaxSize } from "helper";
import Authen from "layout/auth/Authen";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { IAbout } from "types/managerType";
import styles from "./styles.module.scss";

function AboutSetting() {
  const Ref = useRef<any>(null);
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useQuery("aboutMe", () => getAbout());
  const [form] = useForm();

  const handleSubmit = async (payload: IAbout) => {
    setLoading(true);
    try {
      await getEditAbout(payload);
      message.success("thay đổi thông tin thành công");
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const typeFile = ["image/png", "image/jpeg", "image/gif"];

  const handleChangeAvatar = async (event: any) => {
    if (!typeFile.includes(event.target.files[0].type)) {
      message.destroy();
      message.error("file chỉ có thể là .png .jpg .gif");
      return;
    }
    if (event.target.files[0].size > imgMaxSize) {
      message.destroy();
      message.error("file upload chỉ có thể dưới 5M");
      return;
    }
    let data = new FormData();
    data.append("file", event.target.files[0]);
    if (!event.target.files[0]) return;
    try {
      setLoading(true);
      await setAvatarAbout(data);
      await refetch();
      message.success("thay đổi ảnh đại diện thành công");
      message.destroy();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!data) return;
    form.setFieldsValue(data);
  }, [data]);
  return (
    <Authen>
      <div className="manager">
        {loading && <Loading />}
        <div className="container-manager">
          <div className={styles.aboutContainer}>
            <div className={styles.avatar}>
              <div className={styles.img}>
                <Image
                  src={data?.thumbnail || noAvatar}
                  alt=""
                  width={120}
                  height={120}
                />
                <div
                  className={styles.changeImage}
                  onClick={() => Ref.current.click()}
                >
                  <UploadOutlined />
                </div>
                <input
                  name="file"
                  id="file"
                  type="file"
                  className={styles.file}
                  ref={Ref}
                  onChange={handleChangeAvatar}
                />
              </div>
            </div>
            <Form onFinish={handleSubmit} form={form}>
              <Form.Item labelCol={{ span: 24 }} label="title" name="title">
                <Input />
              </Form.Item>

              <Form.Item
                labelCol={{ span: 24 }}
                label="facebook"
                name="facebook"
              >
                <Input />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }} label="instal" name="instal">
                <Input />
              </Form.Item>
              <Form.Item
                labelCol={{ span: 24 }}
                label="linkedin"
                name="linkedin"
              >
                <Input />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }} label="youtube" name="youtube">
                <Input />
              </Form.Item>
              <Form.Item labelCol={{ span: 24 }} label="content" name="content">
                <TextArea />
              </Form.Item>
              <Button htmlType="submit" type="primary">
                Thay Đổi
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </Authen>
  );
}

export default AboutSetting;
