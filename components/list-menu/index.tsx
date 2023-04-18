import { Dropdown, Menu } from "antd";
import { getListCategory } from "../../api-client/manager";
import classNames from "classnames";
import { CATEGORY } from "../../common";
import CustomModal from "./../../layout/custom-modal";
import useCategory from "../../hooks/useCategory";
import React, { useState } from "react";
import { useQuery } from "react-query";
import Link from "next/link";
import { useRouter } from "next/router";
import styles from "./styles.module.scss";

// import { NavLink, useHistory, useLocation } from 'react-router-dom';

function ListMenu() {
  const router = useRouter();
  //   const location = useLocation();
  //   const history = useHistory();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { setCategory } = useCategory();
  const { data, refetch } = useQuery("get-category", getListCategory);
  const handleMenu = (value: number) => {
    const newCategory = {
      category: value,
      page: 1,
    };
    setCategory(newCategory);
    if (location.pathname === "/article") return;
    router.push("/article");
  };

  const menu = (
    <Menu style={{ minWidth: 220 }}>
      {data?.map((item: any, key: number) => (
        <Menu.Item key={item?.id} onClick={() => handleMenu(item?.id)}>
          {item.name_category}
        </Menu.Item>
      ))}
    </Menu>
  );

  const course = (
    <Menu style={{ minWidth: 220 }}>
      <Menu.Item key="1" onClick={() => setIsOpenModal(true)}>
        Khóa học JavaScript trong 7 ngày
      </Menu.Item>
      <Menu.Item key="2" onClick={() => setIsOpenModal(true)}>
        Khóa học ReactJS trong 7 ngày
      </Menu.Item>
      <Menu.Item key="3" onClick={() => setIsOpenModal(true)}>
        Khóa học Front-End trong 1 tuần
      </Menu.Item>
    </Menu>
  );

  return (
    <div className={styles.listMenu}>
      <ul>
        <li className={router.pathname == "/" ? `${styles.active}` : ""}>
          <Link href="/">HOME</Link>
        </li>
        <li>
          <div
            className={classNames(
              { [styles.active]: router.pathname === "/article" },
              styles.menuWrapper
            )}
          >
            <div className={styles.menuItem}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <div>ARTICLES</div>
              </Dropdown>
            </div>
          </div>
        </li>
        <li>
          <Link
            className={router.pathname == "/about" ? `${styles.active}` : ""}
            href="/about"
          >
            ABOUT
          </Link>
        </li>
        <li>
          <div className={styles.menuWrapper}>
            <div className={styles.menuItem}>
              <Dropdown overlay={course} trigger={["click"]}>
                <div>COURSE</div>
              </Dropdown>
            </div>
          </div>
        </li>
      </ul>
      <CustomModal
        isOpen={isOpenModal}
        handleOk={() => setIsOpenModal(false)}
        handleCancel={() => setIsOpenModal(false)}
        children={"Khóa học sẽ được ra mắt vào tháng 8/2023"}
        title={"Khóa học"}
      />
    </div>
  );
}

export default ListMenu;
