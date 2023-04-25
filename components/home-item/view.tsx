import React from "react";
import styles from "./style.module.scss";

interface ViewProps {
  view?: number;
  icon: any;
}
function View(props: ViewProps) {
  const { icon, view } = props;
  return (
    <div className={styles.view}>
      {icon}
      <p>{view || 0}</p>
    </div>
  );
}

export default View;
