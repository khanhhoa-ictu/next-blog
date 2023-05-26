import React from "react";
import Image from "next/image";
import noData from "assets/images/nodata.png";
import styles from "./styles.module.scss";

function NoData() {
  return <Image src={noData} alt="no-data" className={styles.noData} />;
}

export default NoData;
