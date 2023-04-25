import { Pagination } from "antd";
import { getPostByCategory } from "../../api-client/manager";
import ArticleItem from "../../components/article-item";
import Loading from "../../components/loading";
import useCategory from "../../hooks/useCategory";
import { isEmpty } from "lodash";
import React from "react";
import { useQuery } from "react-query";
import { IPost } from "../../types/managerType";
import styles from "./style.module.scss";

function Article() {
  const { category, setCategory } = useCategory();
  const { data, isFetching } = useQuery(["getPost", category], () =>
    getPostByCategory(category)
  );
  if (isFetching) {
    return <Loading />;
  }
  const handleChangePage = (page: number) => {
    setCategory({ ...category, page });
  };
  return (
    <div className={styles.articleContainer}>
      <div className={styles.listArticle}>
        {data?.post?.map((item: IPost) => (
          <ArticleItem item={item} key={item?.id} />
        ))}
      </div>
      {isEmpty(data?.post) ? null : (
        <Pagination
          current={category.page}
          total={data?.total}
          onChange={handleChangePage}
          pageSize={10}
        />
      )}
    </div>
  );
}

export default Article;
