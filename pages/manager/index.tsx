import {
  CommentOutlined,
  HomeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import { IDashCount } from "../../types/managerType";
import DashCount from "../../components/dash-count";
import styles from "./style.module.scss";
import Auth from "layout/auth";

function Manager() {
  const listDash = [
    {
      count: 100,
      title: "users",
      icon: <UserOutlined />,
      backgroundColor: "#FF9F43",
    },
    {
      count: 200,
      title: "post",
      icon: <HomeOutlined />,
      backgroundColor: "#28C76F",
    },
    {
      count: 200,
      title: "like",
      icon: <LikeOutlined />,
      backgroundColor: "#00CFE8",
    },
    {
      count: 200,
      title: "comment",
      icon: <CommentOutlined />,
      backgroundColor: "#3a4e8b",
    },
  ];

  return (
    <Auth>
      <div className={styles.manager}>
        <div className={styles.dashCount}>
          {listDash.map((item: IDashCount, key) => {
            return <DashCount item={item} key={key} />;
          })}
        </div>
        <div className={styles.hotPost}></div>
      </div>
    </Auth>
  );
}

export default Manager;
