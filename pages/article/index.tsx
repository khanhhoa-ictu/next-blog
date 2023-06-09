import { Pagination } from "antd";
import { CATEGORY } from "common";
import NoData from "components/no-data";
import { isEmpty } from "lodash";
import { useQuery } from "react-query";
import { getPostByCategory } from "../../api-client/manager";
import ArticleItem from "../../components/article-item";
import Loading from "../../components/loading";
import useCategory from "../../hooks/useCategory";
import { IPost } from "../../types/managerType";
import styles from "./style.module.scss";
function Article({ post }: any) {
  const { category, setCategory } = useCategory();
  const { data, isFetching } = useQuery(
    ["getPost", category],
    () => getPostByCategory(category),
    {
      initialData: post,
    }
  );
  if (isFetching) {
    return <Loading />;
  }
  const handleChangePage = (page: number) => {
    setCategory({ ...category, page });
  };
  return (
    <div className={styles.articleContainer}>
      {isEmpty(data?.post) ? (
        <NoData />
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}

export default Article;

export async function getStaticProps() {
  try {
    const post = await getPostByCategory({
      category: CATEGORY.HTML_CSS,
      page: 1,
    });
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    return {
      props: {},
    };
  }
}
