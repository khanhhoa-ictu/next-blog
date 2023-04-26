import { Button } from "antd";
import { addPost, deletePost, editPost, getPost } from "api-client/manager";
import Loading from "components/loading";
import CustomModal from "components/custom-modal";

import TableCustom from "components/custom-table";
import { handleErrorMessage } from "helper";
import React, { useState } from "react";
import { useQuery } from "react-query";
import { IPost } from "types/managerType";
import AddPost from "layout/add-post";
import EditPost from "layout/edit-post";
import styles from "./style.module.scss";
import Auth from "layout/auth";

function Post() {
  const [isOpenModal, setIsOpenModal] = useState({
    add: false,
    edit: false,
    delete: false,
  });
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState<number>();
  const handleDelete = async (id: number) => {
    setIsOpenModal({ ...isOpenModal, delete: true });
    setId(id);
  };

  const { data: listPost, refetch: refetchPost } = useQuery(
    "listStaffAll",
    () => getPost()
  );

  const handleOkAdd = async (data: IPost) => {
    try {
      await addPost(data);
      await refetchPost();
      setIsOpenModal({ ...isOpenModal, add: false });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  const handleOkEdit = async (data: IPost) => {
    const newData = { ...data, id: id };
    try {
      setLoading(true);
      await editPost(newData);
      await refetchPost();
      setIsOpenModal({ ...isOpenModal, edit: false });
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditPost = (id: number) => {
    setIsOpenModal({ ...isOpenModal, edit: true });
    setId(id);
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },

    {
      title: "Action",
      dataIndex: "id",
      key: "id",
      render: (record: any) => {
        return (
          <div
            key={record}
            className="color-blue font-medium cursor-pointer break-word"
          >
            <Button onClick={() => handleEditPost(record)}>Sửa</Button>
            <Button onClick={() => handleDelete(record)}>Xóa</Button>
          </div>
        );
      },
    },
  ];
  const handleOkDelete = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await deletePost(id);
      refetchPost();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setIsOpenModal({ ...isOpenModal, delete: false });
      setLoading(false);
    }
  };
  return (
    <Auth>
      <div className="manager">
        {loading && <Loading />}
        <div className="container-manager">
          <div className={styles.postContainer}>
            <div className={styles.addPost}>
              <Button
                className={styles.add}
                onClick={() => setIsOpenModal({ ...isOpenModal, add: true })}
              >
                Thêm bài viết
              </Button>
            </div>
            <TableCustom dataSource={listPost} columns={columns} />
          </div>
        </div>

        <AddPost
          isModalVisible={isOpenModal.add}
          handleOk={handleOkAdd}
          handleCancel={() => setIsOpenModal({ ...isOpenModal, add: false })}
        />
        {id && (
          <EditPost
            isModalVisible={isOpenModal.edit}
            handleOk={handleOkEdit}
            handleCancel={() => setIsOpenModal({ ...isOpenModal, edit: false })}
            id={id}
          />
        )}

        <CustomModal
          isOpen={isOpenModal.delete}
          handleOk={handleOkDelete}
          handleCancel={() => setIsOpenModal({ ...isOpenModal, delete: false })}
          title={"Xóa bài viết"}
        >
          Bạn có muốn xóa bài viết không
        </CustomModal>
      </div>
    </Auth>
  );
}

export default Post;
