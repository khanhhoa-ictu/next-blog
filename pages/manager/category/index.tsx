import { Button, Input } from "antd";
import {
  getListCategory,
  handleAddCategory,
  handleDeleteCategory,
  handleEditCategory,
} from "api-client/manager";
import CustomModal from "components/custom-modal";
import TableCustom from "components/custom-table";
import Loading from "components/loading";
import { handleErrorMessage } from "helper";
import Authen from "layout/auth/Authen";
import { useState } from "react";
import { useQuery } from "react-query";
import styles from "./style.module.scss";
function Category() {
  const [loading, setLoading] = useState(false);
  const { data, refetch } = useQuery("get-category", getListCategory);
  const [isOpenModal, setIsOpenModal] = useState({
    delete: false,
    add: false,
    edit: false,
  });
  const [id, setId] = useState<number>();
  const [titleAdd, setTitleAdd] = useState("");
  const columns = [
    {
      title: "Category",
      dataIndex: "name_category",
      key: "name_category",
    },

    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (action: any, record: any) => {
        return (
          <div
            key={record?.id}
            className="color-blue font-medium cursor-pointer break-word"
          >
            <Button onClick={() => handleEdit(record?.id)}>Sửa</Button>
            <Button onClick={() => handleDelete(record?.id)}>Xóa</Button>
          </div>
        );
      },
    },
  ];
  const handleDelete = async (id: number) => {
    setIsOpenModal({ ...isOpenModal, delete: true });
    setId(id);
  };

  const handleEdit = async (id: number) => {
    setIsOpenModal({ ...isOpenModal, edit: true });
    setId(id);
  };

  const handleOkDelete = async () => {
    if (!id) return;
    try {
      await handleDeleteCategory(id);
      refetch();
    } catch (error) {
      handleErrorMessage(error);
    }
    setIsOpenModal({ ...isOpenModal, delete: false });
  };
  const handleOkAdd = async () => {
    setLoading(true);
    try {
      await handleAddCategory(titleAdd);
      refetch();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
      setTitleAdd("");
      setIsOpenModal({ ...isOpenModal, add: false });
    }
  };
  const handleCloseAdd = (action: string) => {
    setIsOpenModal({ ...isOpenModal, [action]: false });
    setTitleAdd("");
  };

  const handleOkEdit = async () => {
    if (!id) return;
    setLoading(true);
    try {
      await handleEditCategory(titleAdd, id);
      refetch();
    } catch (error) {
      handleErrorMessage(error);
    } finally {
      setLoading(false);
      setTitleAdd("");
      setIsOpenModal({ ...isOpenModal, edit: false });
    }
  };

  return (
    <Authen>
      <div className="manager">
        {loading && <Loading />}
        <div className="container-manager">
          <div className={styles.categoryContainer}>
            <div className={styles.addUser}>
              <Button
                className={styles.add}
                onClick={() => setIsOpenModal({ ...isOpenModal, add: true })}
              >
                Thêm danh mục
              </Button>
            </div>
            <TableCustom dataSource={data} columns={columns} />
          </div>
        </div>
        <CustomModal
          isOpen={isOpenModal.delete}
          handleOk={handleOkDelete}
          handleCancel={() => setIsOpenModal({ ...isOpenModal, delete: false })}
          title={"Xóa danh mục"}
        >
          Bạn có muốn xóa bài viết không
        </CustomModal>

        <CustomModal
          isOpen={isOpenModal.add}
          handleOk={handleOkAdd}
          handleCancel={() => handleCloseAdd("add")}
          title={"Thêm danh mục"}
        >
          <Input
            value={titleAdd}
            onChange={(e) => setTitleAdd(e.target.value)}
          />
        </CustomModal>
        <CustomModal
          isOpen={isOpenModal.edit}
          handleOk={handleOkEdit}
          handleCancel={() => handleCloseAdd("edit")}
          title={"Sửa danh mục"}
        >
          <Input
            value={titleAdd}
            onChange={(e) => setTitleAdd(e.target.value)}
          />
        </CustomModal>
      </div>
    </Authen>
  );
}

export default Category;
