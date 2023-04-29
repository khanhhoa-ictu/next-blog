import { Pagination } from "antd";
import { isEmpty } from "lodash";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { getPostAll } from "../api-client/home";
import Carouse from "../components/carousel";
import HomeItem from "../components/home-item";
import Loading from "../components/loading";
import Seo from "../components/seo";
import Auth from "../layout/auth";
import { IPost } from "../types/managerType";
import styles from "./styles.module.scss";
const initPage = {
  page: 1,
};
function Home({ listPost }: any) {
  const [page, setPage] = useState(initPage);
  const { data: listPostAll, isFetching: isFetchingPostAll } = useQuery(
    ["listPostAll", page],
    () => getPostAll(page)
  );

  if (isFetchingPostAll) {
    return <Loading />;
  }
  const handleChangePage = (page: number, pageSize: number) => {
    const newPage = {
      page,
    };
    setPage(newPage);
  };

  return (
    <Auth>
      <Seo
        data={{
          title: "ReactJs blog | Smile123",
          url: "smile123.site",
          thumbnail:
            "https://res.cloudinary.com/smile159/image/upload/v1682320712/lqgujsjlifs0lzyco58s.png",
          description: "share articles about ReactJS",
        }}
      />
      <div className={styles.container}>
        <div className={styles.homeContainer}>
          <div className={styles.carousel}>
            {/* <Carouse /> */}
          </div>
          <div className={styles.articleContainer}>
            <div className={styles.listArticle}>
              {listPostAll?.listPost?.map((item: IPost) => (
                <HomeItem item={item} key={item?.id} />
              ))}
            </div>
          </div>
          <div className={styles.pagination}>
            {isEmpty(listPostAll?.listPost) ? null : (
              <Pagination
                current={page.page}
                total={10}
                onChange={handleChangePage}
                pageSize={10}
              />
            )}
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default Home;

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {},
  };
}
