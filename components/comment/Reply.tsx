import React, { useState } from "react";
import { format } from "timeago.js";
import { IReply } from "../../types/postType";
import style from "./style.module.scss";
import noAvatar from "../../assets/images/no-avatar.png";
import useProfile from "../../hooks/useProfile";
import { Button } from "antd";
import CustomModal from "../../components/custom-modal";
import { handleErrorMessage } from "../../helper";
import { useQueryClient } from "react-query";
import { deleteCommentReply } from "../../api-client/post-detail";
import { useRouter } from "next/router";
import Image from "next/image";
interface ReplyProps {
  reply: IReply;
}
function Reply(props: ReplyProps) {
  const { reply } = props;
  const router = useRouter();
  const { profile } = useProfile();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const handleOk = () => {
    setIsOpenModal(false);
    handleDeleteComment();
  };
  const handleDeleteComment = async () => {
    try {
      await deleteCommentReply(reply.id);
      await queryClient.invalidateQueries("getComment");
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <div className={style.replyContainer}>
      <div className={style.replyWrapper}>
        <div className={style.replyInfo}>
          <div className={style.replyAvatar}>
            <Image
              src={reply.avatar || noAvatar}
              alt=""
              width={36}
              height={36}
            />
          </div>
          <div className={style.replyProfile}>
            <p
              className={style.user}
              onClick={() => router.push(`/profile/${reply.id}`)}
            >
              {reply.username}
            </p>
            <span>{format(reply.reg_date)}</span>
          </div>
        </div>
        {reply.username === profile?.username ? (
          <Button onClick={() => setIsOpenModal(true)}>xóa</Button>
        ) : null}
      </div>

      <div className={style.replyContent}>{reply.content}</div>

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

export default Reply;
