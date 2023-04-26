import { Button } from "antd";
import { deleteUser, getUser } from "api-client/user";
import Loading from "components/loading";
import TableCustom from "components/custom-table";
import React from "react";
import { useQuery } from "react-query";
import styles from "./style.module.scss";
import Auth from "layout/auth";

function User() {
  const { data, isFetching, refetch } = useQuery("getUser", () => getUser());

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUser(id);
      refetch();
    } catch (error) {}
  };
  const columns = [
    {
      title: "Title",
      dataIndex: "username",
      key: "username",
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
            <Button>Sửa</Button>
            <Button onClick={() => handleDeleteUser(record?.id)}>Xóa</Button>
          </div>
        );
      },
    },
  ];

  if (isFetching) {
    return <Loading />;
  }
  return (
    <Auth>
      <div className="manager">
        <div className="container-manager">
          <div className={styles.postContainer}>
            <div className={styles.addUser}>
              <Button className={styles.add}>Thêm người dùng</Button>
            </div>
            <TableCustom dataSource={data} columns={columns} />
          </div>
        </div>
      </div>
    </Auth>
  );
}

export default User;
