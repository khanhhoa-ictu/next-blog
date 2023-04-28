import { Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { getPostAlls } from "api-client/manager";
import {
  addComment,
  deleteComment,
  getComment,
  getPostDetail,
} from "api-client/post-detail";
import Comment from "components/comment";
import Loading from "components/loading";
import Seo from "components/seo";
import configs from "config";
import { checkScript, handleErrorMessage } from "helper";
import useProfile from "hooks/useProfile";
import { isEmpty } from "lodash";
import moment from "moment";
import { GetStaticPropsContext } from "next";
import { useState } from "react";
import { useQuery } from "react-query";
import { IComment } from "types/postType";
import styles from "./style.module.scss";

function PostDetail({ postDetail }: any) {
  const { data: comment, refetch: fetchComment } = useQuery(
    "getComment",
    () => getComment(Number(postDetail?.id)),
    { enabled: !!postDetail }
  );
  const [commentUser, setContentUser] = useState("");
  const { profile } = useProfile();

  const handleSubmitComment = async () => {
    const newComment = {
      user_id: profile?.id,
      post_id: postDetail?.id,
      content: commentUser.trim(),
    };
    if (!profile?.id) {
      message.destroy();
      message.error("chức năng bình luận chỉ có thể sử dụng bởi thành viên");
      return;
    }

    if (checkScript(newComment.content)) {
      message.destroy();
      message.error("bình luận thất bại");
      return;
    }
    if (!newComment.content) {
      message.destroy();
      message.error("khung bình luận không thể để trống");
      return;
    }
    try {
      await addComment(newComment);
      fetchComment();
    } catch (error) {
      handleErrorMessage(error);
    }
    setContentUser("");
  };

  const handleDeleteComment = async (id: number) => {
    try {
      await deleteComment(id);
      fetchComment();
    } catch (error) {
      handleErrorMessage(error);
    }
  };
  if (!postDetail) {
    return <Loading />;
  }
  return (
    <div className={styles.container}>
      <Seo
        data={{
          title: `${postDetail?.title} | Smile blog`,
          url: `${configs?.HOST_URL}/post/${postDetail?.slug}`,
          thumbnail: postDetail?.thumbnail,
          description: postDetail?.summary,
        }}
      />
      <div className={styles.containerDetail}>
        <div className={styles.detail}>
          <div className={styles.dateTime}>
            <p>
              {moment(postDetail?.reg_date).format("DD/MM/YYYY")} - By Smile
            </p>
          </div>
          <div className={styles.detailContent}>
            <div
              dangerouslySetInnerHTML={{ __html: `${postDetail?.content}` }}
              className={styles.detailContents}
            ></div>
          </div>
        </div>

        <div className={styles.production}></div>
      </div>
      <div className={styles.commentContainer}>
        <div className={styles.comment}>
          <h2>Leave a Reply</h2>
          <TextArea
            value={commentUser}
            onChange={(e) => setContentUser(e.target.value)}
            className={styles.textArea}
            maxLength={300}
          />
          <div className={styles.submitComment}>
            <Button onClick={handleSubmitComment}>Bình Luận</Button>
          </div>
        </div>
        {!isEmpty(comment) && (
          <div className={styles.listComment}>
            {comment?.map((item: IComment) => (
              <Comment
                item={item}
                handleDeleteComment={handleDeleteComment}
                key={item?.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PostDetail;

export async function getStaticPaths() {
  try {
    const listPost = await getPostAlls();
    const listSlug = listPost?.map((item: any) => ({
      params: { slug: item?.slug },
    }));
    return { paths: listSlug, fallback: false };
  } catch (error) {
    return {
      paths: [],
      fallback: false,
    };
  }
}

export async function getStaticProps(context: GetStaticPropsContext) {
  try {
    const postDetail = await getPostDetail(String(context.params?.slug));
    return {
      props: {
        postDetail,
      },
    };
  } catch (error) {
    return { props: {} };
  }
}
