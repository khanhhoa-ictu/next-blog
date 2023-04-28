import useMobile from "../../hooks/useMobile";
import React from "react";
import Header from "../../components/header";
import HeaderMobile from "../../components/header-mobile";
import styles from "./styles.module.scss";

export default function PageHeader() {
  const { isMobile } = useMobile();
  return (
    <div className={styles.headerWrapper}>
      {isMobile ? <HeaderMobile /> : <Header />}
    </div>
  );
}
