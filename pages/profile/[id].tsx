import { Form, message } from "antd";
import { getProfileById, setProfileAbout } from "../../api-client/profile";
import noAvatar from "../../assets/images/no-avatar.png";
import Loading from "../../components/loading";
import CustomModal from "../../components/custom-modal";
import { handleErrorMessage } from "../../helper";
import useProfile from "../../hooks/useProfile";
import React, { useState } from "react";
import { useQuery } from "react-query";
import AboutMe from "../../components/about-me";
import Detail from "../../components/detail-profile";
import styles from "./style.module.scss";
import girl from "../../assets/profile/girl.png";
import leaf_01 from "../../assets/profile/leaf_01.png";
import leaf_02 from "../../assets/profile/leaf_02.png";
import leaf_03 from "../../assets/profile/leaf_03.png";
import leaf_04 from "../../assets/profile/leaf_04.png";
import bg from "../../assets/profile/bg.jpg";
import classNames from "classnames";
import Image from "next/image";
import { useRouter } from "next/router";
import Auth from "../../layout/auth";
import { GetStaticPropsContext } from "next";

function Profile() {
  const [isOpenModal, setIsOpenModal] = useState({
    about: false,
    detail: false,
  });
  const [form] = Form.useForm();
  const { profile } = useProfile();
  const router = useRouter();
  const { id } = router.query;
  const { data: profileById, refetch } = useQuery(
    ["fetchProfileById", id],
    () => {
      if (isNaN(Number(id))) return;
      return getProfileById(Number(id));
    },
    {
      enabled: true,
    }
  );
  const [aboutMe, setAboutMe] = useState({
    id: Number(id),
    about: profileById?.about,
  });
  const [detail, setDetail] = useState({
    id: id,
    username: profileById?.username,
    email: profileById?.email,
    address: profileById?.address,
    avatar: profileById?.avatar,
  });

  const handleOkConfirmAbout = async () => {
    try {
      await setProfileAbout(aboutMe);
      await refetch();
      setAboutMe({ ...aboutMe, about: "" });
      setIsOpenModal({ ...isOpenModal, about: false });
      message.success("thay đổi tiêu đề thành công");
      message.destroy();
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  const handleOkConfirm = async () => {
    form.submit();
    await refetch();
    setIsOpenModal({ ...isOpenModal, detail: false });
    setDetail({ ...detail, username: "", email: "", address: "", avatar: "" });
  };

  const changeAbout = (value: string) => {
    setAboutMe({ ...aboutMe, about: value });
  };

  const handleCancelDetail = async () => {
    setIsOpenModal({ ...isOpenModal, detail: false });
    await refetch();
  };

  const handleCancelAbout = () => {
    setAboutMe({ ...aboutMe, about: profileById?.about });
    setIsOpenModal({ ...isOpenModal, about: false });
  };

  return (
    <Auth>
      <div className={styles.container}>
        {!profileById && <Loading />}
        <section className={styles.section}>
          <div className={styles.leaves}>
            <div className={styles.set}>
              <div>
                <Image src={leaf_01} alt="" width={79} height={38} />
              </div>
              <div>
                <Image src={leaf_02} alt="" width={65} height={58} />
              </div>
              <div>
                <Image src={leaf_03} alt="" width={60} height={43} />
              </div>
              <div>
                <Image src={leaf_04} alt="" width={68} height={40} />
              </div>
            </div>
          </div>
          <Image
            src={bg}
            className={styles.bg}
            alt=""
            width={1920}
            height={1080}
          />
          <Image
            src={girl}
            className={styles.girl}
            alt=""
            width={476}
            height={539}
          />
          <div className={styles.profile}>
            <div className={styles.info}>
              <div className={styles.infoContainer}>
                <p className={styles.name}>{profileById?.username}</p>

                <div className={styles.avatar}>
                  <div className={styles.img}>
                    <Image
                      src={profileById?.avatar ? profileById?.avatar : noAvatar}
                      alt=""
                      width={150}
                      height={150}
                    />
                  </div>
                </div>

                {profile?.id === Number(id) && (
                  <span
                    className={classNames(styles.address, styles.update)}
                    onClick={() =>
                      setIsOpenModal({ ...isOpenModal, detail: true })
                    }
                  >
                    thay đổi
                  </span>
                )}
              </div>
            </div>
            <div className={styles.content}>
              <h3 className={styles.details}>Giới thiệu</h3>

              <div className={styles.description}>
                <p className={styles.aboutContent}>{profileById?.about}</p>
              </div>

              {profile?.id === Number(id) && (
                <p
                  className={styles.update}
                  onClick={() =>
                    setIsOpenModal({ ...isOpenModal, about: true })
                  }
                >
                  thay đổi
                </p>
              )}
            </div>
          </div>
        </section>

        <CustomModal
          isOpen={isOpenModal.about}
          handleOk={handleOkConfirmAbout}
          handleCancel={handleCancelAbout}
          title={"About me"}
        >
          <AboutMe aboutMe={profileById?.about} changeAbout={changeAbout} />
        </CustomModal>

        <CustomModal
          isOpen={isOpenModal.detail}
          handleOk={handleOkConfirm}
          handleCancel={handleCancelDetail}
          title={""}
        >
          <Detail
            form={form}
            detail={profile}
            profile={profileById}
            refetchProfileById={async () => await refetch()}
          />
        </CustomModal>
      </div>
    </Auth>
  );
}

export default Profile;
