import { Button, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { addReply } from "../../api-client/post-detail";
import noAvatar from "../../assets/images/no-avatar.png";
import CustomModal from "../../components/custom-modal";
import {
  checkScript,
  handleError,
  handleErrorMessage,
  replaceURLs,
} from "../../helper";
import useProfile from "../../hooks/useProfile";
import { isEmpty } from "lodash";
import React, { useState } from "react";
import { useQueryClient } from "react-query";
import { format } from "timeago.js";
import { IComment, IReply } from "../../types/postType";
import Reply from "./Reply";
import styles from "./style.module.scss";
import Image from "next/image";
import { useRouter } from "next/router";

interface CommentProps {
  item: IComment;
  handleDeleteComment: (id: number) => void;
}
function Comment(props: CommentProps) {
  const router = useRouter();
  const { item, handleDeleteComment } = props;
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [reply, setReply] = useState("");
  const [isReply, setIsReply] = useState(false);
  const { profile } = useProfile();
  const queryClient = useQueryClient();
  const handleOk = () => {
    setIsOpenModal(false);
    handleDeleteComment(item.id);
  };
  const handleSubmitReply = async () => {
    if (!profile?.id) {
      handleError("chức năng bình luận chỉ có thể sử dụng bởi thành viên");
      return;
    }
    if (!reply.trim()) {
      handleError("bình luận không được để trống");
      return;
    }
    if (checkScript(reply.trim())) {
      message.destroy();
      message.error("bình luận thất bại");
      return;
    }
    const replyParams = {
      content: reply.trim(),
      comment_id: item?.id,
      user_id: profile?.id,
    };

    try {
      await addReply(replyParams);
      await queryClient.invalidateQueries("getComment");
    } catch (error) {
      handleErrorMessage(error);
    }

    setReply("");
    setIsReply(false);
  };

  return (
    <div className={styles.commentItem}>
      <div className={styles.comment}>
        <div className={styles.contentCommentItem}>
          <div className={styles.avatar}>
            <Image
              src={item?.avatar || noAvatar}
              alt=""
              width={36}
              height={36}
            />
          </div>
          <div className={styles.information}>
            <p
              className={styles.userName}
              onClick={() => router.push(`/profile/${item.user_id}`)}
            >
              {item.username}
            </p>
            <p className={styles.timeAgo}>{format(item.reg_date)}</p>
          </div>
        </div>
        <div
          className={styles.contentText}
          dangerouslySetInnerHTML={{ __html: `${replaceURLs(item?.content)}` }}
        ></div>
        {!isReply && (
          <div className={styles.reply} onClick={() => setIsReply(true)}>
            Reply
          </div>
        )}
        {isReply && (
          <div className={styles.comment}>
            <TextArea
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              className={styles.textArea}
              placeholder="viết phản hồi của bạn ..."
              maxLength={300}
            />
            <div className={styles.submitComment}>
              <Button onClick={handleSubmitReply}>Reply</Button>
            </div>
          </div>
        )}
        {!isEmpty(item.reply) && (
          <div className={styles.repComment}>
            {item?.reply?.map((reply: IReply) => (
              <Reply reply={reply} key={reply.id} />
            ))}
          </div>
        )}
      </div>

      {item.user_id === profile?.id ? (
        <Button onClick={() => setIsOpenModal(true)}>xóa</Button>
      ) : null}

      <CustomModal
        isOpen={isOpenModal}
        handleOk={handleOk}
        handleCancel={() => setIsOpenModal(false)}
        children={"Bạn có muốn xóa bình luận không"}
        title={"Bình luận"}
      />
    </div>
  );
}

export default Comment;
