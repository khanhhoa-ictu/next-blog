import { Form, Input, message } from "antd";
import { setAvatar, setProfileDetail } from "../../api-client/profile";
import React, { useRef, useState } from "react";
import styles from "./style.module.scss";
import noAvatar from "../../assets/images/no-avatar.png";
import useProfile from "../../hooks/useProfile";
import Loading from "../../components/loading";
import { handleErrorMessage, imgMaxSize } from "../../helper";
import { UploadOutlined } from "@ant-design/icons";
import Image from "next/image";

interface DetailProps {
  form: any;
  detail: any;
  profile: any;
  refetchProfileById: () => void;
}
function Detail(props: DetailProps) {
  const { form, detail, refetchProfileById } = props;
  const { refetchProfile } = useProfile();
  const [loading, setLoading] = useState(false);
  const Ref = useRef<any>(null);

  const handleSubmit = async (payload: any) => {
    const data = { ...payload, id: detail.id };
    try {
      await setProfileDetail(data);
      refetchProfileById();
      message.success("thay đổi thông tin thành công");
    } catch (error) {
      handleErrorMessage(error);
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
      await setAvatar(data);
      await refetchProfile();
      message.success("thay đổi ảnh đại diện thành công");
      message.destroy();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className={styles.detail}>
      {loading && <Loading />}
      <div className={styles.avatar}>
        <div className={styles.img}>
          <Image
            src={detail?.avatar || noAvatar}
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
      <Form onFinish={handleSubmit} form={form} initialValues={detail}>
        <Form.Item
          label="username"
          name="username"
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="email"
          name="email"
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="address"
          name="address"
          labelAlign="left"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
}

export default Detail;
