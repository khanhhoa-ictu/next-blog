import {
  HomeOutlined,
  SettingOutlined,
  TableOutlined,
  UserOutlined,
  ReadOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import classNames from "classnames";
import useToggleSideNav from "../../hooks/useToggleSideNav";
import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import Link from "next/link";

export default function SideNav() {
  const { collapsed } = useToggleSideNav();
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("1");

  const routes = [
    {
      key: "1",
      text: "Manager",
      url: "/manager",
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      text: "Post",
      url: "/manager/post",
      icon: <TableOutlined />,
    },
    {
      key: "3",
      text: "Users",
      url: "/manager/users",
      icon: <UserOutlined />,
    },
    {
      key: "4",
      text: "About",
      url: "/manager/about-setting",
      icon: <SettingOutlined />,
    },
    {
      key: "5",
      text: "Category",
      url: "/manager/category",
      icon: <ReadOutlined />,
    },
  ];

  useEffect(() => {
    routes.forEach((route) => {
      if (router.pathname.startsWith(route.url || "###")) {
        setSelectedKey(route.key);
      }
    });
  }, [router.pathname]);

  return (
    <div
      className={classNames({
        [styles.sideNav]: true,
        [styles.sideNavCollapsed]: collapsed,
      })}
      style={{ width: collapsed ? 80 : 250, transition: "width 0.3s" }}
    >
      <Link className={styles.logo} href="/">
        HOME
      </Link>
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {routes.map((route) => {
          return (
            <Menu.Item key={route.key} icon={route.icon}>
              <Link href={route.url}>{route.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}
