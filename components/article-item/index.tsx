import Image from "next/image";
import { IPost } from "../../types/managerType";
import styles from "./style.module.scss";
import Link from "next/link";

interface ArticleProps {
  item: IPost;
}
function Article(props: ArticleProps) {
  const { item } = props;
  return (
    <div className={styles.articleItem}>
      <div className={styles.articleContent}>
        <div className={styles.post}>
          <div className={styles.articleTitle}>
            <Link href={`/post/${item.id}`}>{item.title}</Link>
          </div>
          <div>
            <p className={styles.postText}>{item.summary}</p>
          </div>
        </div>

        <div className={styles.articleImg}>
          <Image src={item.thumbnail} alt="" width={428} height={315} />
        </div>
      </div>
    </div>
  );
}

export default Article;
