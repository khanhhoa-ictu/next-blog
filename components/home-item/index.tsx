import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { IPost } from "../../types/managerType";
import styles from "./style.module.scss";
import View from "./view";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import moment from "moment";
interface HomeItemProps {
  item: IPost;
}
function HomeItem(props: HomeItemProps) {
  const router = useRouter();
  const { item } = props;
  console.log(item);
  return (
    <div className={styles.articleItem}>
      <div className={styles.postImg}>
        <Link href={`/post/${item.slug}`} className={styles.navLink}>
          <Image src={item.thumbnail} alt="" width={1280} height={680} />
        </Link>
      </div>
      <div className={styles.postContent}>
        <div className={styles.title}>
          <Link href={`/post/${item.slug}`} className={styles.navLinkContent}>
            <h3> {item.title} </h3>
          </Link>
          <div className={styles.date}>
            <div className={styles.dateItem}>
              <p>Smile</p>
              <span>-</span>
            </div>
            <div className={styles.dateItem}>
              <p>{moment(item?.reg_date).format("YYYY/MM/DD")}</p>
              <span>-</span>
            </div>

            <View icon={<EyeOutlined />} view={item?.view} />
          </div>
        </div>
        <div className={styles.content}>
          <p>{item.summary}</p>
        </div>
        <Button
          className={styles.more}
          onClick={() => router.push(`/post/${item.slug}`)}
        >
          Xem Thêm
        </Button>
      </div>
    </div>
  );
}

export default HomeItem;
