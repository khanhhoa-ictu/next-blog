import { EyeOutlined } from "@ant-design/icons";
import { Button } from "antd";
import React from "react";
import { IPost } from "../../types/managerType";
import styles from "./style.module.scss";
import View from "./view";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
interface HomeItemProps {
  item: IPost;
}
function HomeItem(props: HomeItemProps) {
  const router = useRouter();
  const { item } = props;
  return (
    <div className={styles.articleItem}>
      <div className={styles.postImg}>
        <Link href={`/post/${item.id}`} className={styles.navLink}>
          <Image src={item.thumbnail} alt="" width={1280} height={680} />
        </Link>
      </div>
      <div className={styles.postContent}>
        <div className={styles.title}>
          <Link href={`/post/${item.id}`} className={styles.navLinkContent}>
            <h3> {item.title} </h3>
          </Link>
          <View icon={<EyeOutlined />} view={item?.view} />
        </div>
        <div className={styles.content}>
          <p>{item.summary}</p>
        </div>
        <Button
          className={styles.more}
          onClick={() => router.push(`/post/${item.id}`)}
        >
          Xem Thêm
        </Button>
      </div>
    </div>
  );
}

export default HomeItem;
