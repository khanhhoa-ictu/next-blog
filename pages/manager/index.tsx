import {
  CommentOutlined,
  HomeOutlined,
  LikeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import Seo from "components/seo";
import Authen from "layout/auth/Authen";
import DashCount from "../../components/dash-count";
import { IDashCount } from "../../types/managerType";
import styles from "./style.module.scss";

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
    <Authen>
      <Seo
        data={{
          title: "sdassada",
          url: "smile123.site",
          thumbnail:
            "https://res.cloudinary.com/smile159/image/upload/v1682320712/lqgujsjlifs0lzyco58s.png",
          description: "share articles about ReactJS",
        }}
      />
      <div className={styles.manager}>
        <div className={styles.dashCount}>
          {listDash.map((item: IDashCount, key) => {
            return <DashCount item={item} key={key} />;
          })}
        </div>
        <div className={styles.hotPost}></div>
      </div>
    </Authen>
  );
}

export default Manager;
