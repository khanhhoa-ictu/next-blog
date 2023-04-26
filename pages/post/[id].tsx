import { Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import {
  addComment,
  deleteComment,
  getComment,
  getPostDetail,
} from "api-client/post-detail";
import Loading from "components/loading";
import { checkScript, handleErrorMessage } from "helper";
import useProfile from "hooks/useProfile";
import moment from "moment";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { IComment } from "types/postType";
import Comment from "components/comment";
import styles from "./style.module.scss";
import { isEmpty } from "lodash";
import { useRouter } from "next/router";
interface ParamTypes {
  id: string;
}

function PostDetail() {
  const router = useRouter();
  const { id } = router.query;
  const { data: postDetail, isFetching: fetchPostDetail } = useQuery(
    "postDetail",
    () => getPostDetail(Number(id))
  );
  const { data: comment, refetch: fetchComment } = useQuery("getComment", () =>
    getComment(Number(id))
  );
  const [commentUser, setContentUser] = useState("");
  const { profile } = useProfile();

  const handleSubmitComment = async () => {
    const newComment = {
      user_id: profile?.id,
      post_id: id,
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
      // await addComment(newComment);
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
  if (fetchPostDetail) {
    return <Loading />;
  }

  return (
    <div className={styles.container}>
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
